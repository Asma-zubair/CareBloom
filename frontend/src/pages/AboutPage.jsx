import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Card from "../components/Card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* About Section */}
      <section className="pt-24 pb-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 dark:bg-primary-800/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-800/10 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-6xl">🌸</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About CareBloom
            </h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 border-2 border-primary-200 dark:border-primary-800">
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-5xl">🤰</span>
                </motion.div>
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Empowering Maternal Health with AI
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    CareBloom is an AI-powered pregnancy monitoring system
                    designed to assist mothers and doctors in predicting
                    pregnancy risks and detecting <strong>Pre-eclampsia</strong>
                    , a serious condition that may occur after 20 weeks of
                    pregnancy and can harm both the mother's and baby's organs.
                  </p>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mt-4 font-semibold">
                    Our goal is to help ensure early detection, awareness, and
                    timely medical support through intelligent AI predictions
                    and instant communication alerts.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* How CareBloom Works */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <motion.span
                className="text-5xl inline-block mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🧠
              </motion.span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How CareBloom Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Model A */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800">
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-4 mx-auto"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-3xl">🧩</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
                    Model A – Pregnancy Risk Prediction
                  </h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p>
                      ✓ <strong>Algorithm:</strong> XGBoost
                    </p>
                    <p>
                      ✓ <strong>Accuracy:</strong> 85.25%
                    </p>
                    <p>
                      ✓ <strong>Output:</strong> Low, Medium, or High Risk
                    </p>
                    <p>
                      ✓ <strong>Dataset:</strong> Maternal Health Risk (Kaggle)
                    </p>
                    <motion.div
                      className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm font-medium">
                        Predicts pregnancy risk level and triggers further
                        evaluation when needed.
                      </p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Model B */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800">
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 mx-auto"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-3xl">💉</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
                    Model B – Pre-eclampsia Detection
                  </h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p>
                      ✓ <strong>Algorithm:</strong> Random Forest
                    </p>
                    <p>
                      ✓ <strong>Accuracy:</strong> 95.12%
                    </p>
                    <p>
                      ✓ <strong>Activation:</strong> Only for High Risk cases
                    </p>
                    <p>
                      ✓ <strong>Dataset:</strong> Pre-eclampsia Dataset (Kaggle)
                    </p>
                    <motion.div
                      className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm font-medium">
                        Predicts Pre-eclampsia presence (Low, Medium, High) with
                        probability percentage.
                      </p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* AI-Powered Advice */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-5xl">💬</span>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                    AI-Powered Medical Advice
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Using the <strong>Groq API (LLaMA 3.1 8B Instant)</strong>,
                    CareBloom generates empathetic, easy-to-understand medical
                    advice to guide patients with care and confidence.
                  </p>
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 shadow-lg"
                    whileHover={{
                      x: 10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "You are doing great! Maintain a balanced diet, stay
                      hydrated, and consult your doctor regularly."
                    </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* WhatsApp Alerts */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-5xl">📲</span>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                    Smart WhatsApp Alerts
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    CareBloom integrates <strong>Twilio WhatsApp API</strong>{" "}
                    for real-time alerts. The system sends customized WhatsApp
                    messages based on prediction results.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-3xl mb-2">1️⃣</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Send <strong>'join guide-being'</strong> to{" "}
                        <strong>+1 415 523 8886</strong>
                      </p>
                    </motion.div>
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-3xl mb-2">2️⃣</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your WhatsApp number in the app
                      </p>
                    </motion.div>
                    <motion.div
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-3xl mb-2">3️⃣</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click <strong>"Send Message"</strong> to receive alerts
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.span
                className="text-5xl inline-block mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                ⚙️
              </motion.span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Technology Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "React",
                  icon: "⚛️",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  name: "FastAPI",
                  icon: "⚡",
                  color: "from-green-500 to-teal-500",
                },
                {
                  name: "XGBoost",
                  icon: "🚀",
                  color: "from-orange-500 to-red-500",
                },
                {
                  name: "Random Forest",
                  icon: "🌲",
                  color: "from-green-600 to-emerald-600",
                },
                {
                  name: "Groq LLaMA",
                  icon: "🤖",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  name: "Twilio",
                  icon: "📱",
                  color: "from-red-500 to-pink-500",
                },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Card
                    className={`text-center bg-gradient-to-br ${tech.color} text-white`}
                  >
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {tech.icon}
                    </motion.div>
                    <p className="font-semibold text-sm">{tech.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <Card className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white border-none shadow-2xl">
              <motion.div
                className="text-5xl mb-6"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💡
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                To revolutionize maternal health by combining the power of AI
                prediction, real-time communication, and human-centered design —
                ensuring that every mother receives the right care at the right
                time.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
