from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from twilio.rest import Client
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Pregnancy Risk API with WhatsApp Alerts & AI Advice")

# ===========================
# Load Models and Scalers
# ===========================
try:
    model_a = joblib.load("model_a.joblib")
    model_b = joblib.load("model_b.joblib")
    scaler_a = joblib.load("scaler_model_a.joblib")
    scaler_b = joblib.load("scaler_model_b.joblib")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load models or scalers: {e}")

# ===========================
# Twilio Config
# ===========================
TWILIO_SID = os.getenv('TWILIO_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_WHATSAPP_FROM = os.getenv('TWILIO_WHATSAPP_FROM')
TO_NUMBER = os.getenv('TO_NUMBER')

client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

# ===========================
# Groq Setup
# ===========================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY)

# ===========================
# Input Schema
# ===========================
class InputData(BaseModel):
    Age: float
    SystolicBP: float
    DiastolicBP: float
    BS: float
    BodyTemp: float
    HeartRate: float
    PulsePressure: float
    gravida: float = 0
    parity: float = 0
    gestational_age_weeks: float = 0
    Age_yrs: float = 0
    BMI: float = 0
    diabetes: int = 0
    hypertension: int = 0
    HB: float = 0
    fetal_weight: float = 0
    Protien_Uria: int = 0
    amniotic_fluid_levels: float = 0


class AlertData(BaseModel):
    Risk_Level: str


# ===========================
# WhatsApp Alert Function
# ===========================
def send_whatsapp_alert(risk_level: str):
    if risk_level == "high risk":
        body = "🚨 *High Risk Alert!* Please contact your doctor immediately for a detailed checkup."
    elif risk_level == "mid risk":
        body = "⚠️ *Warning:* Your pregnancy shows moderate risk. Take care and schedule a medical check soon."
    else:
        body = "✅ *Safe:* Your pregnancy risk is low. Keep following a healthy lifestyle!"

    message = client.messages.create(
        from_=TWILIO_WHATSAPP_FROM,
        body=body,
        to=TO_NUMBER
    )
    return message.sid


# ===========================
# AI Advice Generator
# ===========================
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


# ===========================
# Prediction Endpoint
# ===========================
@app.post("/predict/")
def predict(data: InputData):
    try:
        body_temp_fahrenheit = (data.BodyTemp * 9 / 5) + 32

        x_a = pd.DataFrame(
            [[data.Age, data.SystolicBP, data.DiastolicBP, data.BS,
              body_temp_fahrenheit, data.HeartRate, data.PulsePressure]],
            columns=["Age", "SystolicBP", "DiastolicBP", "BS", "BodyTemp", "HeartRate", "PulsePressure"]
        )

        x_a_scaled = scaler_a.transform(x_a)
        risk_pred = int(model_a.predict(x_a_scaled)[0])
        risk_map = {1: "low risk", 2: "mid risk", 0: "high risk"}
        risk_label = risk_map.get(risk_pred, "unknown")

        result = {"Risk_Level": risk_label}

        # Only activate Model B if high risk
        if risk_label == "high risk":
            feature_map_b = {
                "gravida": "gravida",
                "parity": "parity",
                "gestational_age_weeks": "gestational age (weeks)",
                "Age_yrs": "Age (yrs)",
                "BMI": "BMI  [kg/m²]",
                "diabetes": "diabetes",
                "hypertension": "History of hypertension (y/n)",
                "SystolicBP": "Systolic BP",
                "DiastolicBP": "Diastolic BP",
                "HB": "HB",
                "fetal_weight": "fetal weight(kgs)",
                "Protien_Uria": "Protien Uria",
                "amniotic_fluid_levels": "amniotic fluid levels(cm)"
            }

            FEATURES_B = list(feature_map_b.values())
            x_b_dict = {feature_map_b.get(k, k): v for k, v in data.dict().items()}
            x_b = pd.DataFrame([[x_b_dict[col] for col in FEATURES_B]], columns=FEATURES_B)
            x_b_scaled = scaler_b.transform(x_b)
            disease_pred = int(model_b.predict(x_b_scaled)[0])
            disease_proba = model_b.predict_proba(x_b_scaled)[0]

            disease_map = {1: "low", 2: "mid", 0: "high"}
            disease_label = disease_map.get(disease_pred, "unknown")
            disease_prob = f"{disease_proba[disease_pred] * 100:.1f}%"

            result.update({
                "Disease_Status": disease_label,
                "Disease_Probability": disease_prob
            })
        else:
            result.update({
                "Disease_Status": "N/A",
                "Disease_Probability": "0%"
            })

        # Generate advice using Groq model
        advice = generate_advice(result["Risk_Level"], result["Disease_Status"])
        result["AI_Advice"] = advice

        return result

    except Exception as e:
        return {"error": "Prediction failed", "details": str(e)}


# ===========================
# Send Alert Endpoint
# ===========================
@app.post("/send_alert/")
def send_alert(data: AlertData):
    try:
        sid = send_whatsapp_alert(data.Risk_Level)
        return {"message": "Alert sent successfully!", "sid": sid}
    except Exception as e:
        return {"error": "Failed to send alert", "details": str(e)}


# ===========================
# Run Server
# ===========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


         