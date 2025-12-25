import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Stethoscope, User, Send, Download } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { pregnancyAPI } from "../utils/api";
import toast from "react-hot-toast";

const ChatAssistantPage = () => {
  const location = useLocation();
  const assessmentResult = location.state?.result || null;

  const [userType, setUserType] = useState("patient");
  const [mode, setMode] = useState("advice"); // "advice" or "plan"
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lastPlan, setLastPlan] = useState(null);

  const riskLevel = assessmentResult?.Risk_Level || null;
  const diseaseStatus = assessmentResult?.Disease_Status || null;

  const handleSend = async (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    // If no question is provided, fall back to a generic request
    // that relies on the analyzed risk and disease status.
    const effectiveQuestion =
      trimmedQuestion ||
      (mode === "plan"
        ? "Generate a personalized care plan based on the latest risk and disease analysis."
        : "Provide simple, clear advice based on the latest risk and disease analysis.");

    const payload = {
      userType,
      mode,
      question: effectiveQuestion,
      riskLevel,
      diseaseStatus,
    };

    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: effectiveQuestion,
      meta: { userType, mode },
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await pregnancyAPI.chat(payload);
      const data = response.data;

      if (data.mode === "plan") {
        const plan = data.health_plan || {};
        const parts = [];

        if (Array.isArray(plan.diet_suggestions) && plan.diet_suggestions.length) {
          parts.push(
            "Diet Suggestions:\n- " + plan.diet_suggestions.join("\n- ")
          );
        }

        if (
          Array.isArray(plan.rest_hydration_plan) &&
          plan.rest_hydration_plan.length
        ) {
          parts.push(
            "Rest & Hydration Plan:\n- " + plan.rest_hydration_plan.join("\n- ")
          );
        }

        if (
          Array.isArray(plan.weekly_checkup_reminders) &&
          plan.weekly_checkup_reminders.length
        ) {
          parts.push(
            "Weekly Checkup Reminders:\n- " +
              plan.weekly_checkup_reminders.join("\n- ")
          );
        }

        const combined = parts.join("\n\n");

        // Store the structured plan so it can be downloaded.
        setLastPlan({
          plan,
          risk_level: data.risk_level,
          disease_status: data.disease_status,
          user_type: userType,
        });

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content:
              combined ||
              "Here is a simple health plan: follow a balanced diet, take regular rest, drink enough water, and keep your scheduled checkups.",
            meta: { mode: "plan", riskLevel: data.risk_level, diseaseStatus: data.disease_status },
          },
        ]);
      } else {
        // In advice mode, clear any previously stored plan.
        setLastPlan(null);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: data.answer,
            meta: { mode: "advice", riskLevel: data.risk_level, diseaseStatus: data.disease_status },
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to contact assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPlan = () => {
    if (!lastPlan) return;

    const { plan, risk_level, disease_status, user_type } = lastPlan;

    const lines = [];
    lines.push("Pregnancy Care Plan");
    lines.push("");
    lines.push(`User type: ${user_type || "patient"}`);
    lines.push(`Risk level: ${risk_level || "unknown"}`);
    lines.push(`Disease status: ${disease_status || "unknown"}`);
    lines.push("");

    if (Array.isArray(plan.diet_suggestions) && plan.diet_suggestions.length) {
      lines.push("Diet Suggestions:");
      plan.diet_suggestions.forEach((item) => lines.push(`- ${item}`));
      lines.push("");
    }

    if (Array.isArray(plan.rest_hydration_plan) && plan.rest_hydration_plan.length) {
      lines.push("Rest & Hydration Plan:");
      plan.rest_hydration_plan.forEach((item) => lines.push(`- ${item}`));
      lines.push("");
    }

    if (
      Array.isArray(plan.weekly_checkup_reminders) &&
      plan.weekly_checkup_reminders.length
    ) {
      lines.push("Weekly Checkup Reminders:");
      plan.weekly_checkup_reminders.forEach((item) => lines.push(`- ${item}`));
      lines.push("");
    }

    const content = lines.join("\n");
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const safeRisk = (risk_level || "unknown").replace(/\s+/g, "-");
    const safeUser = (user_type || "patient").toLowerCase();
    link.download = `care-plan-${safeUser}-${safeRisk}.txt`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary-600" />
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  AI Care Assistant
                </h1>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Ask medical questions or generate a personalized care plan
                based on the latest assessment. This assistant is for
                educational support only and does not replace a doctor.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    I am using it as:
                  </span>
                  <div className="flex rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                    <button
                      type="button"
                      onClick={() => setUserType("patient")}
                      className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                        userType === "patient"
                          ? "bg-primary-600 text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <User className="w-3 h-3 mr-1" /> Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("doctor")}
                      className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                        userType === "doctor"
                          ? "bg-primary-600 text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Stethoscope className="w-3 h-3 mr-1" /> Doctor
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    I want:
                  </span>
                  <div className="flex rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                    <button
                      type="button"
                      onClick={() => setMode("advice")}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        mode === "advice"
                          ? "bg-purple-600 text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Advice
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("plan")}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        mode === "plan"
                          ? "bg-purple-600 text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Care Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-80 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-4 bg-white dark:bg-gray-950 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center text-gray-400 text-sm">
                    Start by selecting who you are and what you need,
                    then ask a question or request a care plan.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "ml-auto bg-primary-600 text-white"
                          : "mr-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {msg.content}
                    </motion.div>
                  ))
                )}
              </div>

              <form onSubmit={handleSend} className="space-y-3">
                <Input
                  label={
                    mode === "advice"
                      ? "Your Question"
                      : "Anything you want us to focus on? (optional)"
                  }
                  name="question"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={
                    mode === "advice"
                      ? "e.g., What can I do to manage swelling in my feet?"
                      : "e.g., Focus more on diet and rest suggestions."
                  }
                />

                {mode === "plan" && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    If you leave the field empty, a care plan will still be
                    generated automatically based on the latest assessment
                    (risk level and disease status).
                  </p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {mode === "advice" ? "Ask for Advice" : "Generate Plan"}
                  </Button>
                </div>

                {mode === "plan" && lastPlan && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 flex items-center"
                      onClick={handleDownloadPlan}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Plan
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Assessment Context
              </h2>

              {assessmentResult ? (
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <p className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                      Risk Level
                    </p>
                    <p className="capitalize text-gray-700 dark:text-gray-300">
                      {assessmentResult.Risk_Level}
                    </p>
                  </div>

                  {assessmentResult.Disease_Status && (
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                        Disease Status
                      </p>
                      <p className="capitalize text-gray-700 dark:text-gray-300">
                        {assessmentResult.Disease_Status}
                      </p>
                      {assessmentResult.Disease_Probability && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Probability: {assessmentResult.Disease_Probability}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    The assistant uses this information to tailor answers and
                    care plans. For urgent or severe symptoms, always contact a
                    doctor or emergency service directly.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No recent assessment data was provided. You can still ask
                  general questions, but for personalized guidance, it is best
                  to first complete an assessment.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistantPage;
