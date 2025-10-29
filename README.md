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

## 🩺 Disease Focus – Pre-eclampsia

**Pre-eclampsia** is a serious pregnancy complication that usually occurs **after 20 weeks**, marked by:

- High blood pressure  
- Signs of organ damage (especially liver and kidneys)  
- Risks to both mother and baby’s health  

Early detection is crucial, and **CareBloom** helps in identifying Pre-eclampsia **before it becomes life-threatening.**

---

## 💬 AI-Based Medical Advice

- **API Used:** Groq API – LLaMA 3.1 8B Instant  
- **Goal:** Generates short, empathetic, and simple advice for patients based on model outputs.

**Example Advice:**
> “You are doing great! Maintain a balanced diet, stay hydrated, and consult your doctor regularly for checkups.”

---

## 💌 WhatsApp Alert Messages

Customized messages are automatically sent to patients or doctors through **Twilio WhatsApp API**, based on the pregnancy risk level.

## 📞 WhatsApp Connection Setup

Before receiving alerts, users must connect to the CareBloom WhatsApp Alert Service by following these steps:

**Join the Twilio WhatsApp Sandbox**

To activate alert messaging, send this message on WhatsApp:


**join guide-being**
to this number:
+1 415 523 8886

**Enter Your WhatsApp Number**

On the CareBloom frontend, enter your WhatsApp number (including the country code, e.g., +923XXXXXXXXX).

Click “Send Message”
Once joined, click the Send Message button to receive alerts directly on WhatsApp according to prediction.

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


## Workflow Diagram 

```
👩‍🍼 User Input (Age, BP, Heart Rate, etc.) + Phone Number
        ↓
📊 Model A (Pregnancy Risk Prediction - XGBoost)
        ↓
🔍 Output: Low / Medium / High Risk
        ↓
➡️ If High → Activate Model B
        ↓
🧠 Model B (Pre-eclampsia Detection - Random Forest)
        ↓
📈 Output: Disease Risk (Low / Medium / High) + Probability (%)
        ↓
💬 Groq API (LLaMA 3.1 8B) → Generates Medical Advice
        ↓
📱 "Send Message" Button Clicked (Optional by User)
        ↓
📨 WhatsApp Alert Sent to Entered Number (Based on Model A Output)
        ↓
🌸 Result Dashboard (React Frontend)
```

---

## 💡 Our Mission
To revolutionize maternal health by combining the power of **AI prediction**, **real-time communication**, and **human-centered design** — ensuring that every mother receives the right care at the right time.






