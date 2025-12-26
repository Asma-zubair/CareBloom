# 🌸 CareBloom – AI-Powered Pregnancy Risk & Disease Assessment System

🤰 **CareBloom** is an intelligent maternal health assistant that predicts pregnancy risk, detects **Pre-eclampsia**, and provides instant **AI-powered medical advice** with **WhatsApp alerts** for critical cases.

---

## 🩺 Overview

**CareBloom** is an AI-driven health monitoring system designed to improve maternal safety and early disease detection during pregnancy.  
It uses two machine learning models to:

- 🔹 Predict **pregnancy risk levels** (Low, Medium, High)  
- 🔹 Detect **Pre-eclampsia**, a dangerous pregnancy-related disease that can occur after 20 weeks and may damage the organs of both mother and baby  

By combining **predictive AI** with **real-time communication**, CareBloom empowers both mothers and healthcare providers to take timely preventive action.

---

## 🧠 Features

### 🧩 Model A – Pregnancy Risk Prediction
- **Dataset:** Kaggle – Maternal Health Risk Dataset  
- **Algorithm:** XGBoost  
- **Accuracy:** 85.25%  
- **Output:** Low Risk, Mid Risk, High Risk  
- **Purpose:** Determines whether the pregnancy is at risk and triggers further evaluation if needed.

---

### 💉 Model B – Pre-eclampsia Detection
- **Dataset:** Kaggle – Pre-eclampsia in Pregnant Women Dataset  
- **Algorithm:** Random Forest (optimized using Grid Search CV)  
- **Accuracy:** 95.12%  
- **Activation:** Only runs when Model A detects “High Risk”  
- **Output:** Disease Risk (Low, Medium, High) and Probability (%)

---

### 🤖 AI Care Assistant (Patient & Doctor Modes)
- **Powered by:** Groq API – LLaMA 3.1 8B Instant  
- **Modes:**
        - **Advice mode** – short, empathetic educational guidance for patients or clearer wording for doctors.  
        - **Care plan mode** – generates a structured care plan instead of free‑text advice.  
- **Context-aware:** Uses the latest assessment result (risk level and Pre‑eclampsia status) to tailor responses.  

---

### 📋 Personalized, Downloadable Care Plans
- **Generated from:** Risk level (Low/Mid/High) and disease status.  
- **Includes:**
        - Diet suggestions  
        - Rest & hydration guidance  
        - Weekly checkup reminders  
- **Downloadable:** Patients or doctors can download the care plan as a text file from the AI Assistant.

---

## 🩺 Disease Focus – Pre-eclampsia

**Pre-eclampsia** is a serious pregnancy complication that usually occurs **after 20 weeks**, marked by:

- High blood pressure  
- Signs of organ damage (especially liver and kidneys)  
- Risks to both mother and baby’s health  

Early detection is crucial, and **CareBloom** helps in identifying Pre-eclampsia **before it becomes life-threatening.**

---

## 💬 AI-Based Medical Advice

- **API Used:** Groq API – LLaMA 3.1 8B Instant  
- **Who it supports:**
        - **Patients:** Simple, warm, non‑technical language.  
        - **Doctors:** Clear, focused summaries without heavy jargon.  
- **Integration:** Fully integrated into the AI Care Assistant page, which reads the latest risk and disease analysis.

---

## 💌 WhatsApp Alert Messages

Customized messages are sent through **Twilio WhatsApp API** and can be addressed either to the **patient** or to the **doctor**:

- **Patient alerts:** Simple, supportive language encouraging contact with a doctor for high or moderate risk.  
- **Doctor alerts:** Short clinical summary that a new low / moderate / high‑risk case has been identified and may need closer follow‑up.  

Alerts are always optional and triggered from the assessment screen after a prediction is generated.

## 📞 WhatsApp Connection Setup

Before receiving alerts, users must connect to the CareBloom WhatsApp Alert Service by following these steps:

**Join the Twilio WhatsApp Sandbox**

To activate alert messaging, send this message on WhatsApp:


**join guide-being**
to this number:
+1 415 523 8886

**Enter Your WhatsApp Number**

On the CareBloom frontend, enter your WhatsApp number (including the country code, e.g., +923XXXXXXXXX).

Click “Send WhatsApp Alert”  
Once joined, click the **Send WhatsApp Alert** button to receive alerts directly on WhatsApp according to prediction.

---

## ⚙️ Tech Stack

| Component | Technology Used |
|------------|------------------|
| **Frontend (UI)** | React.js |
| **Backend (API)** | FastAPI |
| **AI Models** | Scikit-learn (XGBoost, Random Forest) |
| **AI Advice Generation** | Groq API – LLaMA 3.1 8B Instant |
| **Messaging Service** | Twilio WhatsApp API |
| **Model Storage** | Joblib |
| **Version Control** | Git & GitHub |
| **Programming Language** | Python (Backend), JavaScript (Frontend) |
| **Data Handling** | Pandas, NumPy |
| **Deployment** | Vercel (Frontend), Render (Backend) |


## Workflow Diagram 

```
👩‍🍼 User Input (Age, BP, Heart Rate, etc.)
        ↓
📡 FastAPI Backend (/api/predict)
        ↓
📊 Model A – Pregnancy Risk Prediction (XGBoost)
        ↓
🔍 Output: Risk_Level = Low / Mid / High
        ↓
➡️ If High → Activate Model B
        ↓
🧠 Model B – Pre-eclampsia Detection (Random Forest)
        ↓
📈 Output: Disease_Status (Low / Mid / High) + Disease_Probability (%)
        ↓
🧾 Groq API (LLaMA 3.1 8B) → Structured Health Plan
        ↓
🌸 React Dashboard → Shows Risk, Disease Status & Care Plan
        ↓
💬 AI Care Assistant (/api/chat) → Advice or Care Plan (Patient / Doctor)
        ↓
📱 Optional: "Send WhatsApp Alert" (/api/send_alert)
        ↓
📨 Twilio WhatsApp → Patient / Doctor Alert
```

---

## 💡 Our Mission
To revolutionize maternal health by combining the power of **AI prediction**, **real-time communication**, and **human-centered design** — ensuring that every mother receives the right care at the right time.






