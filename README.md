# CareBloom
🌸 CareBloom – AI-Powered Pregnancy Risk & Disease Prediction System

🤰 CareBloom is an intelligent maternal health assistant that predicts pregnancy risk, detects Pre-eclampsia, and provides instant AI-powered medical advice with WhatsApp alerts for critical cases.

🩺 Overview

CareBloom is an AI-driven health monitoring system designed to improve maternal safety and early disease detection during pregnancy.
It uses two machine learning models to:

Predict pregnancy risk levels (Low, Medium, High)

Detect Pre-eclampsia, a dangerous pregnancy-related disease that can occur after 20 weeks and may damage the organs of both mother and baby

By combining predictive AI with real-time communication, CareBloom empowers both mothers and healthcare providers to take timely preventive action.

🧠 System Intelligence
🧩 Model A – Pregnancy Risk Prediction

Dataset: Kaggle – Maternal Health Risk Dataset

Algorithm: XGBoost

Accuracy: 85.25%

Output: Low Risk, Mid Risk, High Risk

Purpose: Determines whether the pregnancy is at risk and triggers further evaluation if needed.

💉 Model B – Pre-eclampsia Detection

Dataset: Kaggle – Pre-eclampsia in Pregnant Women Dataset

Algorithm: Random Forest (optimized using Grid Search CV)

Accuracy: 95.12%

Activation: Only runs when Model A detects “High Risk”

Output: Disease Risk (Low, Medium, High) and probability (%)

🩺 Disease Focus – Pre-eclampsia

Pre-eclampsia is a serious pregnancy complication that usually occurs after 20 weeks, marked by:

High blood pressure

Signs of organ damage (especially liver and kidneys)

Risks to both mother and baby’s health

Early detection is crucial, and CareBloom helps in identifying Pre-eclampsia before it becomes life-threatening.

💬 AI-Based Medical Advice

API Used: Groq API – LLaMA 3.1 8B Instant

Goal: Generates short, empathetic, and simple advice for patients based on model outputs.

Example Advice:

“You are doing great! Maintain a balanced diet, stay hydrated, and consult your doctor regularly for checkups.”
