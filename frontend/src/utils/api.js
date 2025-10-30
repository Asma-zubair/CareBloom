import axios from "axios";

const API_BASE_URL = "https://carebloom.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const pregnancyAPI = {
  healthCheck: () => api.get("/healthz"),
  predict: (data) => api.post("/api/predict", data),
  sendAlert: (riskLevel, phoneNumber = null) =>
    api.post("/api/send_alert", {
      Risk_Level: riskLevel,
      phone_number: phoneNumber,
    }),

};

export default api;
