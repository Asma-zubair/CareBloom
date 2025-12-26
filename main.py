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
import json
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
    user_type: str | None = "patient"  # "patient" or "doctor"


class ChatRequest(BaseModel):
    user_type: str  # "patient" or "doctor"
    mode: str  # "advice" or "plan"
    question: str | None = None
    risk_level: str | None = None
    disease_status: str | None = None


# =======================
# Personalized Health Plan Generator (Groq)
# =======================
def generate_health_plan(risk_level: str, disease_status: str):
    """Generate a structured health plan using Groq.

    Returns a dict with keys:
    - diet_suggestions: list[str]
    - rest_hydration_plan: list[str]
    - weekly_checkup_reminders: list[str]
    """

    prompt = f"""
You are a professional pregnancy health assistant.
Based on these conditions:
- Pregnancy Risk Level: {risk_level}
- Disease Status: {disease_status}

Generate a structured, personalized pregnancy care plan in strict JSON with this schema:

{{
  "diet_suggestions": [
    "short, specific pregnancy-safe diet tip 1",
    "short, specific pregnancy-safe diet tip 2",
    "short, specific pregnancy-safe diet tip 3"
  ],
  "rest_hydration_plan": [
    "short, specific tip about rest or sleep",
    "short, specific tip about hydration",
    "short, specific tip about stress management or breaks"
  ],
  "weekly_checkup_reminders": [
    "short, specific reminder about medical checkups or monitoring",
    "short, specific reminder about warning signs to watch",
    "short, specific reminder about when to contact a doctor"
  ]
}}

Rules:
- Return ONLY valid JSON, no backticks, no extra text.
- Each list must contain 3–5 items.
- Use simple, empathetic language without medical jargon.
- Do not mention that you are an AI.
"""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
            max_tokens=300,
        )

        raw_content = response.choices[0].message.content.strip()

        # Try to parse JSON from the model output
        plan = json.loads(raw_content)

        # Basic normalization/validation
        return {
            "diet_suggestions": list(plan.get("diet_suggestions", [])),
            "rest_hydration_plan": list(plan.get("rest_hydration_plan", [])),
            "weekly_checkup_reminders": list(plan.get("weekly_checkup_reminders", [])),
        }
    except Exception as e:
        # Fallback: return a safe, generic plan
        print("⚠️ Failed to generate structured health plan:", e)
        return {
            "diet_suggestions": [
                "Eat balanced meals with fruits, vegetables, whole grains, and lean protein.",
                "Avoid very salty, fried, or highly processed foods when possible.",
                "Have smaller, frequent meals if you feel nauseous or uncomfortable.",
            ],
            "rest_hydration_plan": [
                "Aim for regular sleep and short rest breaks during the day.",
                "Drink water regularly throughout the day to stay hydrated.",
                "Avoid long periods of standing or heavy physical strain without breaks.",
            ],
            "weekly_checkup_reminders": [
                "Follow your doctor’s schedule for prenatal visits and tests.",
                "Note any new symptoms like severe headache, vision changes, or strong pain and share them with your doctor.",
                "If you feel something is not right, contact your healthcare provider rather than waiting for the next visit.",
            ],
        }


def _normalize_whatsapp_number(phone_number: str | None) -> str:
    """Normalize user-provided phone number into Twilio WhatsApp format.

    - Removes spaces and dashes
    - Ensures a leading '+' on the E.164 number
    - Ensures it is prefixed with 'whatsapp:'
    - Falls back to TO_NUMBER if nothing valid is provided
    """
    if not phone_number:
        return TO_NUMBER

    cleaned = phone_number.strip().replace(" ", "").replace("-", "")

    # If already in full Twilio format, just return
    if cleaned.startswith("whatsapp:+"):
        return cleaned

    # If it already has whatsapp: but missing '+', keep prefix and fix body
    if cleaned.startswith("whatsapp:"):
        body = cleaned.split(":", 1)[1]
        if not body.startswith("+"):
            body = "+" + body
        return f"whatsapp:{body}"

    # At this point we only have the bare number (+923..., 923..., 0300..., etc.)
    if not cleaned.startswith("+"):
        cleaned = "+" + cleaned

    return f"whatsapp:{cleaned}"


# =======================
# WhatsApp Alert Function (Twilio)
# =======================
def send_whatsapp_alert(risk_level: str, phone_number: str = None, user_type: str | None = "patient"):
    if not client:
        print("⚠ Twilio client not configured. Alert not sent.")
        return None

    target_number = _normalize_whatsapp_number(phone_number)
    recipient = (user_type or "patient").lower()

    print(f"📱 Sending WhatsApp alert for {risk_level} to {target_number} as {recipient}")

    # Customize message content based on recipient type and risk level
    if recipient == "doctor":
        if risk_level == "high risk":
            body = (
                "🚨 *High Risk Case Alert*\n"
                "The attached assessment indicates a high pregnancy risk. "
                "Please review the patient's blood pressure, labs, and symptoms as soon as possible "
                "and decide on further management."
            )
        elif risk_level == "mid risk":
            body = (
                "⚠ *Moderate Risk Case*\n"
                "The recent assessment suggests a moderate pregnancy risk. "
                "Kindly consider closer follow-up, monitoring, and any additional tests you find appropriate."
            )
        else:
            body = (
                "✅ *Low Risk Case*\n"
                "The assessment currently indicates a low pregnancy risk. "
                "Please continue routine follow-up according to your usual practice."
            )
    else:
        # Default: patient-facing, simple and supportive
        if risk_level == "high risk":
            body = (
                "🚨 *High Risk Alert*\n"
                "Your assessment shows a higher pregnancy risk. "
                "Please contact your doctor or clinic as soon as you can for a full checkup."
            )
        elif risk_level == "mid risk":
            body = (
                "⚠ *Moderate Risk Alert*\n"
                "Your assessment suggests some warning signs. "
                "Take extra care of your rest, diet, and blood pressure, and book a checkup with your doctor soon."
            )
        else:
            body = (
                "✅ *Low Risk*\n"
                "Your assessment looks low risk right now. "
                "Keep following healthy habits, drinking water, and attending your regular checkups."
            )

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
                data.gravida, data.parity, data.gestational_age_weeks, data.Age, data.BMI,
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

        # --- Personalized Health Plan (Groq) ---
        health_plan = generate_health_plan(result["Risk_Level"], result["Disease_Status"])
        result["Health_Plan"] = health_plan

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/api/send_alert")
async def api_send_alert(data: AlertRequest):
    try:
        sid = send_whatsapp_alert(data.Risk_Level, data.phone_number, data.user_type)

        # If Twilio client is not configured or sending failed, sid will be None
        if not sid:
            return JSONResponse(
                content={"error": "Failed to send WhatsApp alert"},
                status_code=500,
            )

        return JSONResponse(content={"message": "WhatsApp Alert Sent", "sid": sid})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/api/chat")
async def api_chat(request: ChatRequest):
    """Chat endpoint for patients or doctors.

    mode="advice":
        - Uses Groq to generate natural-language guidance based on the question
          and optional risk/disease context.

    mode="plan":
        - Returns a structured health plan using the existing generator
          (diet_suggestions, rest_hydration_plan, weekly_checkup_reminders).
    """
    try:
        mode = (request.mode or "advice").lower()
        user_type = (request.user_type or "patient").lower()
        risk_level = request.risk_level or "unknown"
        disease_status = request.disease_status or "unknown"

        if mode == "plan":
            plan = generate_health_plan(risk_level, disease_status)
            return JSONResponse(
                content={
                    "mode": "plan",
                    "risk_level": risk_level,
                    "disease_status": disease_status,
                    "health_plan": plan,
                }
            )

        # Default: advice mode using Groq chat
        role_description = (
            "You are answering a pregnant patient in simple, warm language."
            if user_type == "patient"
            else "You are answering a healthcare professional, keep language clear but not overly technical."
        )

        base_context = f"Pregnancy risk level: {risk_level}. Disease status: {disease_status}."  # type: ignore[str-format]
        user_question = request.question or "Provide general guidance for this case."

        context_usage_rules = (
            "You may be given a pregnancy risk level and disease status from the user's latest assessment. "
            "Use this personal context ONLY when the question is clearly about this specific pregnant person's condition, "
            "their assessment result, or what they should do next. "
            "If the question is general (for example: 'What is preeclampsia?' or 'In pregnancy, what is normal blood pressure?'), "
            "answer in a general, educational way and do NOT mention any personal risk level or disease status. "
            "If risk_level is 'unknown' or disease_status is 'N/A', do not assume anything about their condition; "
            "answer in a general way without pretending you know their exact risk or diagnosis."
        )

        system_prompt = (
            f"You are a pregnancy health assistant. {role_description} "
            "You do not diagnose or replace a doctor. "
            "Give educational, supportive guidance, and always recommend consulting a qualified doctor for decisions. "
            f"{context_usage_rules}"
        )

        user_prompt = (
            f"Context: {base_context}\n\n"
            f"Question: {user_question}\n\n"
            "Answer in 3–6 short sentences. Avoid medical jargon and do not mention that you are an AI."
        )

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.5,
            max_tokens=260,
        )

        answer = response.choices[0].message.content.strip()

        return JSONResponse(
            content={
                "mode": "advice",
                "risk_level": risk_level,
                "disease_status": disease_status,
                "answer": answer,
            }
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
# =======================
# Health Check Endpoint (for Render)
# =======================
@app.get("/healthz")
def health_check():
    return {"status": "ok"}



         


         
