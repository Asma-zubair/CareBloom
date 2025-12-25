import axios from "axios";

// Use env variable if provided (for local dev or custom setups),
// otherwise fall back to the deployed Render backend URL.
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://carebloom.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const pregnancyAPI = {
  healthCheck: () => api.get("/healthz"),
  predict: (data) => api.post("/api/predict", data),
  sendAlert: (riskLevel, phoneNumber = null, userType = "patient") =>
    api.post("/api/send_alert", {
      Risk_Level: riskLevel,
      phone_number: phoneNumber,
      user_type: userType,
    }),

  chat: ({ userType, mode, question, riskLevel, diseaseStatus }) =>
    api.post("/api/chat", {
      user_type: userType,
      mode,
      question,
      risk_level: riskLevel,
      disease_status: diseaseStatus,
    }),

};

export default api;
