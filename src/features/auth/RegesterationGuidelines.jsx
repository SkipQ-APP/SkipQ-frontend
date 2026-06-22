import { Link } from "react-router-dom";
import { Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import themesMAP from "../../../themes/themes";
import Navbar from "../../ui/naveBar";

export default function RegistrationGuidelines({ onProceed }) {
  const prerequisites = [
    "Organization must be dealing with high traffic",
    "Must have branches across the Republic",
    "All branches must be equipped with surveillance cameras",
    "Each branch must have a dedicated Branch Manager",
    "The organization must have a General Manager",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const bg = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const muted = dark ? "#94a3b8" : "#64748b";
  const softBg = dark ? "#0f172a" : "#ede9fe";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} />

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-2xl rounded-3xl p-8 md:p-12"
          style={{
            backgroundColor: cardBg,
            boxShadow: dark
              ? "0 4px 24px rgba(0,0,0,0.3)"
              : "0 4px 24px rgba(0,0,0,0.07)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="p-4 rounded-full w-fit mx-auto mb-6"
              style={{ backgroundColor: softBg }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Building2 className="w-10 h-10" style={{ color: "#410fc7" }} />
            </motion.div>

            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: text }}
            >
              Registration Guidelines
            </h1>

            <p className="text-base md:text-lg" style={{ color: muted }}>
              Please review the requirements to ensure eligibility
            </p>
          </motion.div>

          {/* List */}
          <motion.div
            className="space-y-4 mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {prerequisites.map((prereq, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-3 rounded-xl transition-colors"
                style={{
                  backgroundColor: "transparent",
                }}
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    <CheckCircle2
                      className="w-6 h-6"
                      style={{ color: "#410fc7" }}
                    />
                  </motion.div>
                </div>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: muted }}
                >
                  {prereq}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="flex-1"
              whileHover={{
                y: -2,
                boxShadow: "0 8px 16px rgba(65,15,199,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/signup"
                onClick={onProceed}
                className="block w-full py-3 rounded-xl font-semibold text-white text-center transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#410fc7" }}
              >
                <span className="flex items-center justify-center gap-2">
                  I Understand, Proceed
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/"
                className="block w-full py-3 rounded-xl font-semibold text-center border-2 transition-colors"
                style={{
                  color: muted,
                  borderColor: dark ? "#334155" : "#e2e8f0",
                  backgroundColor: "transparent",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Back to Home
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}