import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Shield, Activity, Users, Star, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";

const LandingPage = () => {
  const [, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Model A – Pregnancy Risk Prediction",
      description:
        "XGBoost algorithm trained on Maternal Health Risk Dataset with 85.25% accuracy. Determines pregnancy risk levels (Low, Mid, High) and triggers further evaluation when needed.",
      color: "bg-red-500",
      details: "Dataset: Kaggle | Algorithm: XGBoost | Accuracy: 85.25%",
    },
    {
      icon: Shield,
      title: "Model B – Pre-eclampsia Detection",
      description:
        "Random Forest algorithm optimized with Grid Search CV achieving 95.12% accuracy. Activates only for high-risk cases to detect disease probability and severity levels.",
      color: "bg-blue-500",
      details: "Dataset: Kaggle | Algorithm: Random Forest | Accuracy: 95.12%",
    },
    {
      icon: Activity,
      title: "AI-Based Medical Advice",
      description:
        "Powered by Groq API's LLaMA 3.1 8B Instant model to generate empathetic, personalized health advice based on assessment results. Simple guidance tailored to each patient's condition.",
      color: "bg-green-500",
      details: "API: Groq LLaMA 3.1 8B | Smart & Empathetic Responses",
    },
    {
      icon: Users,
      title: "WhatsApp Alert System",
      description:
        "Automated WhatsApp notifications via Twilio API send customized risk alerts to patients or healthcare providers instantly, ensuring timely medical intervention.",
      color: "bg-purple-500",
      details: "Integration: Twilio WhatsApp API | Real-time Alerts",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Obstetrician",
      content:
        "This system has revolutionized how we monitor high-risk pregnancies. The early detection capabilities are remarkable.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Expectant Mother",
      content:
        "Having this monitoring system gave me peace of mind throughout my pregnancy. The alerts helped catch potential issues early.",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Maternal-Fetal Medicine",
      content:
        "The accuracy and reliability of this AI system have significantly improved our patient outcomes.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10,000+", label: "Pregnancies Monitored" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "500+", label: "Healthcare Partners" },
    { number: "24/7", label: "Monitoring Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="gradient-bg pt-20 pb-16 overflow-hidden relative"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Advanced{" "}
                <motion.span
                  className="text-primary-600 inline-block"
                  whileHover={{ scale: 1.05, color: "#ec4899" }}
                  transition={{ duration: 0.3 }}
                >
                  Pregnancy Risk
                </motion.span>{" "}
                Assessment
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                CareBloom is an intelligent maternal health assistant that
                predicts pregnancy risk, detects Pre-eclampsia, and provides
                instant AI-powered medical advice with WhatsApp alerts for
                critical cases
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="group shadow-lg hover:shadow-2xl transition-shadow"
                    onClick={() => navigate("/assessment")}
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:shadow-lg transition-shadow"
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative z-10 w-full max-w-xl mx-auto">
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.03, rotateY: 2, rotateX: -2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.img
                    src="/image6.jpg"
                    alt="Pregnancy care"
                    className="w-full h-full object-cover"
                    loading="eager"
                    style={{ imageRendering: "crisp-edges" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-600 via-pink-500 to-secondary-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-br from-primary-600 to-primary-700 text-white p-4 rounded-xl shadow-lg backdrop-blur-sm cursor-pointer"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 15,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-br from-secondary-600 to-secondary-700 text-white p-4 rounded-xl shadow-lg backdrop-blur-sm cursor-pointer"
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: -15,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
              </motion.div>

              {/* Additional floating badge */}
              <motion.div
                className="absolute top-1/2 -left-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-xl border-2 border-primary-200 dark:border-primary-800 cursor-pointer"
                animate={{
                  x: [-5, 5, -5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.25,
                  rotate: 360,
                  borderColor: "#ec4899",
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)",
                }}
              >
                <Activity className="w-5 h-5 text-primary-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Care Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced system combines cutting-edge technology with medical
              expertise to provide the most reliable pregnancy monitoring
              solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveFeature(index)}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="text-center h-full cursor-pointer group"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Card className="h-full relative overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg relative`}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <feature.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        {/* Pulse ring */}
                        <motion.div
                          className={`absolute inset-0 ${feature.color} rounded-xl`}
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                      </motion.div>

                      <motion.h3
                        className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {feature.description}
                      </p>
                      {feature.details && (
                        <motion.p
                          className="text-sm font-medium text-primary-600 dark:text-primary-400 border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {feature.details}
                        </motion.p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Section - New Section with Images */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Care & Monitoring
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience comprehensive pregnancy care with state-of-the-art
              technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image 2 with animations */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{
                  scale: 1.02,
                  rotateY: -5,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img
                  src="/image8.jpg"
                  alt="Healthcare monitoring"
                  className="w-full h-auto rounded-2xl"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  loading="eager"
                  style={{ imageRendering: "crisp-edges" }}
                />
                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Personalized Health Insights
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our AI-powered system provides personalized health insights
                tailored to each pregnancy journey, ensuring optimal care and
                peace of mind.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time health parameter tracking",
                  "Instant risk assessment alerts",
                  "AI-generated personalized recommendations",
                  "Seamless healthcare provider integration",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-primary-600 to-pink-600 flex items-center justify-center mr-3 mt-1 shadow-md"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 bg-white rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                      />
                    </motion.div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Second row - reversed layout with Image 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                24/7 Continuous Monitoring
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Stay connected with round-the-clock monitoring and instant
                WhatsApp alerts for any concerning changes in health parameters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Alert Response Time", value: "<2 min" },
                  { label: "Monitoring Accuracy", value: "98%" },
                  { label: "User Satisfaction", value: "4.9/5" },
                  { label: "Healthcare Partners", value: "500+" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md cursor-pointer group relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.08,
                      y: -5,
                      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="text-3xl font-bold text-primary-600 mb-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </div>

                    {/* Corner accent */}
                    <motion.div
                      className="absolute -right-2 -top-2 w-16 h-16 bg-primary-500/10 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image 3 with animations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group order-1 md:order-2"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img
                  src="/image7.jpg"
                  alt="Medical care"
                  className="w-full h-auto rounded-2xl"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  loading="eager"
                  style={{ imageRendering: "crisp-edges" }}
                />
                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-secondary-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              {/* Floating notification badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 cursor-pointer"
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 10px 40px rgba(16, 185, 129, 0.5)",
                }}
              >
                <motion.div
                  className="w-2.5 h-2.5 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-bold">Live Monitoring</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
