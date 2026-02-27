import { Link } from "react-router-dom";
import { Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RegesterationGuidelines({ onProceed }) {
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
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: "#f0f4f9" }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8 md:p-12"
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
            style={{ backgroundColor: "#6089da" }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Registration Guidelines
          </h1>

          <p className="text-gray-600 text-base md:text-lg">
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
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 mt-0.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                  }}
                >
                  <CheckCircle2
                    className="w-6 h-6"
                    style={{ color: "#6089da" }}
                  />
                </motion.div>
              </div>

              <p className="text-gray-700 text-base leading-relaxed">
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
          <motion.button
            onClick={onProceed}
            className="flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
            style={{ backgroundColor: "#6089da" }}
            whileHover={{
              y: -2,
              boxShadow: "0 8px 16px rgba(96, 137, 218, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/signup" className="flex items-center gap-2">
            I Understand, Proceed
            </Link>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/"
              className="w-full py-3 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors border-2 border-gray-200 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}