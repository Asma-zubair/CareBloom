from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from groq import Groq
from twilio.rest import Client
import joblib
import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv

# =======================
# Load Environment Variables
# =======================
load_dotenv()

# =======================
# Initialize FastAPI App
# =======================
app = FastAPI()

# =======================
# CORS Setup (important for React)
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =======================
# Load Models and Scalers
# =======================
try:
         scaler_a = joblib.load("save_models/scaler_model_a.joblib")
         model_a = joblib.load("save_models/model_a.joblib")
         scaler_b = joblib.load("save_models/scaler_model_b.joblib")
         model_b = joblib.load("save_models/model_b.joblib")

except Exception as e:
    print("⚠️ Error loading models:", e)

# =======================
# Twilio Config
# =======================
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.getenv("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")
TO_NUMBER = os.getenv("TO_NUMBER", "whatsapp:+923000976116")

if not TWILIO_SID or not TWILIO_AUTH_TOKEN:
    print("⚠ Warning: Twilio credentials not found in environment variables")
    print("WhatsApp alerts will be disabled")
    client = None
else:
    client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

# =======================
# Groq Setup
# =======================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY)

# =======================
# Request Models
# =======================
class PredictionRequest(BaseModel):
    Age: float
    SystolicBP: float
    DiastolicBP: float
    BS: float
    BodyTemp: float
    HeartRate: float
    PulsePressure: float
    gravida: float
    parity: float
    gestational_age_weeks: float
    Age_yrs: float
    BMI: float
    diabetes: int
    hypertension: int
    HB: float
    fetal_weight: float
    Protien_Uria: int
    amniotic_fluid_levels: float


class AlertRequest(BaseModel):
    Risk_Level: str
    phone_number: str


# =======================
# AI Advice Generator (Groq)
# =======================
def generate_advice(risk_level: str, disease_status: str):
    prompt = f"""
You are a professional pregnancy health assistant.
Based on these conditions:
- Pregnancy Risk Level: {risk_level}
- Disease Status: {disease_status}

Give a short, clear, and empathetic medical advice (2–4 sentences)
for the patient, including recommendations or precautions.
Avoid technical words. Example tone:
'You are doing great! Keep up healthy habits and attend regular checkups.'
"""
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=120
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"⚠️ Failed to generate advice: {e}"


# =======================
# WhatsApp Alert Function (Twilio)
# =======================
def send_whatsapp_alert(risk_level: str, phone_number: str = None):
    if not client:
        print("⚠ Twilio client not configured. Alert not sent.")
        return None

    target_number = f"whatsapp:{phone_number}" if phone_number else TO_NUMBER
    print(f"📱 Sending WhatsApp alert for {risk_level} to {target_number}")

    if risk_level == "high risk":
        body = "🚨 *High Risk Alert!* Please contact your doctor immediately for a detailed checkup."
    elif risk_level == "mid risk":
        body = "⚠ *Warning:* Your pregnancy shows moderate risk. Take care and schedule a medical check soon."
    else:
        body = "✅ *Safe:* Your pregnancy risk is low. Keep following a healthy lifestyle!"

    try:
        message = client.messages.create(
            from_=TWILIO_WHATSAPP_FROM,
            body=body,
            to=target_number
        )
        print(f"✅ WhatsApp message sent successfully! SID: {message.sid}")
        return message.sid
    except Exception as e:
        print(f"❌ Failed to send WhatsApp message: {e}")
        return None


# =======================
# API ENDPOINTS
# =======================
@app.post("/api/predict")
async def api_predict(data: PredictionRequest):
    try:
        body_temp_fahrenheit = (data.BodyTemp * 9 / 5) + 32

        # --- Model A ---
        x_a = pd.DataFrame(
            [[data.Age, data.SystolicBP, data.DiastolicBP, data.BS, body_temp_fahrenheit, data.HeartRate, data.PulsePressure]],
            columns=["Age", "SystolicBP", "DiastolicBP", "BS", "BodyTemp", "HeartRate", "PulsePressure"],
        )
        x_a_scaled = scaler_a.transform(x_a)
        risk_pred = int(model_a.predict(x_a_scaled)[0])
        risk_map = {1: "low risk", 2: "mid risk", 0: "high risk"}
        risk_label = risk_map.get(risk_pred, "unknown")

        result = {"Risk_Level": risk_label}

        # --- Model B ---
        if risk_label == "high risk":
            FEATURES_B = [
                "gravida", "parity", "gestational age (weeks)", "Age (yrs)", "BMI  [kg/m²]",
                "diabetes", "History of hypertension (y/n)", "Systolic BP", "Diastolic BP",
                "HB", "fetal weight(kgs)", "Protien Uria", "amniotic fluid levels(cm)"
            ]
            x_b = pd.DataFrame([[
                data.gravida, data.parity, data.gestational_age_weeks, data.Age_yrs, data.BMI,
                data.diabetes, data.hypertension, data.SystolicBP, data.DiastolicBP,
                data.HB, data.fetal_weight, data.Protien_Uria, data.amniotic_fluid_levels
            ]], columns=FEATURES_B)

            x_b_scaled = scaler_b.transform(x_b)
            disease_pred = int(model_b.predict(x_b_scaled)[0])
            disease_proba = model_b.predict_proba(x_b_scaled)[0]

            disease_map = {1: "low", 2: "mid", 0: "high"}
            disease_label = disease_map.get(disease_pred, "unknown")
            disease_prob = f"{disease_proba[disease_pred] * 100:.1f}%"
            result.update({"Disease_Status": disease_label, "Disease_Probability": disease_prob})
        else:
            result.update({"Disease_Status": "N/A", "Disease_Probability": "0%"})

        # --- AI Advice (Groq) ---
        advice = generate_advice(result["Risk_Level"], result["Disease_Status"])
        result["AI_Advice"] = advice

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/api/send_alert")
async def api_send_alert(data: AlertRequest):
    try:
        sid = send_whatsapp_alert(data.Risk_Level, data.phone_number)
        return JSONResponse(content={"message": "WhatsApp Alert Sent", "sid": sid})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
# =======================
# Health Check Endpoint (for Render)
# =======================
@app.get("/healthz")
def health_check():
    return {"status": "ok"}



         


         
