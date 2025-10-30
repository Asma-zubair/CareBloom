import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Send,
  Calendar,
  User,
  Activity,
  Phone,
} from "lucide-react";
import { pregnancyAPI } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const AssessmentPage = () => {
  const [formData, setFormData] = useState({
    Age: "",
    SystolicBP: "",
    DiastolicBP: "",
    BS: "",
    BodyTemp: "",
    HeartRate: "",
    PulsePressure: "",
    gravida: "",
    parity: "",
    gestational_age_weeks: "",
    BMI: "",
    diabetes: 0,
    hypertension: 0,
    HB: "",
    fetal_weight: "",
    Protien_Uria: 0,
    amniotic_fluid_levels: "",
  });

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [showWhatsAppInstructions, setShowWhatsAppInstructions] =
    useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendingAlert, setSendingAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert string values to numbers
      const processedData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (
            key === "diabetes" ||
            key === "hypertension" ||
            key === "Protien_Uria"
          ) {
            acc[key] = parseInt(value) || 0;
          } else {
            acc[key] = parseFloat(value) || 0;
          }
          return acc;
        },
        {}
      );

      const response = await pregnancyAPI.predict(processedData);
      setResult(response.data);

      toast.success("Assessment completed successfully!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to process assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendAlert = async () => {
    if (!result) return;
    if (!whatsappNumber) {
      toast.error("Please enter a WhatsApp number first!");
      return;
    }

    setSendingAlert(true);
    try {
      await pregnancyAPI.sendAlert(result.Risk_Level, whatsappNumber);
      toast.success(`Alert sent successfully to ${whatsappNumber}!`);
    } catch (error) {
      console.error("Alert error:", error);
      toast.error("Failed to send alert. Please try again.");
    } finally {
      setSendingAlert(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "high risk":
        return "text-red-600 bg-red-50 border-red-200";
      case "mid risk":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low risk":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case "high risk":
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case "mid risk":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case "low risk":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Activity className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pregnancy Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete the form below to receive an AI-powered risk assessment for
            pregnancy monitoring.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assessment Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <User className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Patient Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Age"
                    name="Age"
                    type="number"
                    value={formData.Age}
                    onChange={handleInputChange}
                    placeholder="25"
                    required
                  />
                  <Input
                    label="BMI (kg/m²)"
                    name="BMI"
                    type="number"
                    step="0.1"
                    value={formData.BMI}
                    onChange={handleInputChange}
                    placeholder="22.5"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-8 mb-4">
                  <Activity className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Vital Signs
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Systolic BP (mmHg)"
                    name="SystolicBP"
                    type="number"
                    value={formData.SystolicBP}
                    onChange={handleInputChange}
                    placeholder="120"
                    required
                  />
                  <Input
                    label="Diastolic BP (mmHg)"
                    name="DiastolicBP"
                    type="number"
                    value={formData.DiastolicBP}
                    onChange={handleInputChange}
                    placeholder="80"
                    required
                  />
                  <Input
                    label="Heart Rate (bpm)"
                    name="HeartRate"
                    type="number"
                    value={formData.HeartRate}
                    onChange={handleInputChange}
                    placeholder="72"
                    required
                  />
                  <Input
                    label="Body Temperature (°C)"
                    name="BodyTemp"
                    type="number"
                    step="0.1"
                    value={formData.BodyTemp}
                    onChange={handleInputChange}
                    placeholder="37.0"
                    required
                  />
                  <Input
                    label="Blood Sugar (mmol/L)"
                    name="BS"
                    type="number"
                    step="0.1"
                    value={formData.BS}
                    onChange={handleInputChange}
                    placeholder="5.0"
                    required
                  />
                  <Input
                    label="Pulse Pressure"
                    name="PulsePressure"
                    type="number"
                    value={formData.PulsePressure}
                    onChange={handleInputChange}
                    placeholder="40"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 mt-8 mb-4">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pregnancy Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    label="Gravida"
                    name="gravida"
                    type="number"
                    value={formData.gravida}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                  <Input
                    label="Parity"
                    name="parity"
                    type="number"
                    value={formData.parity}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                  <Input
                    label="Gestational Age (weeks)"
                    name="gestational_age_weeks"
                    type="number"
                    value={formData.gestational_age_weeks}
                    onChange={handleInputChange}
                    placeholder="20"
                  />
                  <Input
                    label="Hemoglobin (g/dL)"
                    name="HB"
                    type="number"
                    step="0.1"
                    value={formData.HB}
                    onChange={handleInputChange}
                    placeholder="12.0"
                  />
                  <Input
                    label="Fetal Weight (kg)"
                    name="fetal_weight"
                    type="number"
                    step="0.1"
                    value={formData.fetal_weight}
                    onChange={handleInputChange}
                    placeholder="1.5"
                  />
                  <Input
                    label="Amniotic Fluid Levels (cm)"
                    name="amniotic_fluid_levels"
                    type="number"
                    step="0.1"
                    value={formData.amniotic_fluid_levels}
                    onChange={handleInputChange}
                    placeholder="5.0"
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Medical History
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="diabetes"
                        checked={formData.diabetes === 1}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Diabetes
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="hypertension"
                        checked={formData.hypertension === 1}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Hypertension
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="Protien_Uria"
                        checked={formData.Protien_Uria === 1}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Protein in Urine
                      </span>
                    </label>
                  </div>
                </div>

                {/* WhatsApp Alert Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Send className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      WhatsApp Alert (Optional)
                    </h3>
                  </div>

                  <Input
                    label="WhatsApp Number"
                    name="whatsappNumber"
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (e.target.value && !showWhatsAppInstructions) {
                        setShowWhatsAppInstructions(true);
                      }
                    }}
                    placeholder="+923001234567"
                    helperText="Enter with country code (e.g., +923001234567)"
                  />

                  {showWhatsAppInstructions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                    >
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                        📱 Steps to Connect WhatsApp:
                      </h4>
                      <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li className="flex items-start">
                          <span className="font-bold mr-2 flex-shrink-0">
                            1️⃣
                          </span>
                          <span>
                            Send <strong>"join guide-being"</strong> to{" "}
                            <strong className="text-blue-600 dark:text-blue-400">
                              +1 415 523 8886
                            </strong>{" "}
                            on WhatsApp
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 flex-shrink-0">
                            2️⃣
                          </span>
                          <span>
                            After joining, enter your number above (e.g.,{" "}
                            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                              +923001234567
                            </code>
                            )
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 flex-shrink-0">
                            3️⃣
                          </span>
                          <span>
                            Complete the assessment and you'll receive instant
                            alerts for high or mid-risk cases
                          </span>
                        </li>
                      </ol>
                      <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-xs text-yellow-800 dark:text-yellow-200">
                        ⚠️ <strong>Important:</strong> You must join the Twilio
                        sandbox first, or you won't receive alerts!
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    Analyze Risk Level
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Assessment Results
              </h2>

              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Risk Level */}
                  <div
                    className={`p-4 rounded-lg border-2 ${getRiskColor(
                      result.Risk_Level
                    )}`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      {getRiskIcon(result.Risk_Level)}
                      <span className="font-semibold capitalize">
                        {result.Risk_Level}
                      </span>
                    </div>
                  </div>

                  {/* Disease Status */}
                  {result.Disease_Status && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Disease Status
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 capitalize">
                        {result.Disease_Status}
                      </p>
                      {result.Disease_Probability && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          Probability: {result.Disease_Probability}
                        </p>
                      )}
                    </div>
                  )}

                  {/* AI Advice */}
                  {result.AI_Advice && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                        AI Recommendations
                      </h3>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">
                        {result.AI_Advice}
                      </p>
                    </div>
                  )}

                  {/* Send Alert Button */}
                  <Button
                    onClick={sendAlert}
                    variant="secondary"
                    size="sm"
                    loading={sendingAlert}
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send WhatsApp Alert
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Complete the assessment form to see results</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
