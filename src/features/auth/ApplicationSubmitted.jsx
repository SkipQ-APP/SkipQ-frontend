import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaperPlane,
  faShield,
  faClock,
  faBolt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../../themes/themes";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function ApplicationSubmitted({
  dark = true,
  orgName = "your organization",
}) {
  const bg = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const muted = dark ? "#94a3b8" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";
  const inputSoftBg = dark ? "#0f172a" : "#ede9fe";

  const steps = [
    {
      number: 1,
      title: "Application Sent",
      description: "Your organization details have been received and recorded",
      icon: faPaperPlane,
      active: true,
    },
    {
      number: 2,
      title: "Security Review",
      description:
        "Our team is verifying your organization information and requirements",
      icon: faShield,
      active: true,
    },
    {
      number: 3,
      title: "Final Approval",
      description:
        "Your organization will be activated and you'll receive confirmation via email",
      icon: faCircleCheck,
      active: false,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "100vh",
      }}
      className="flex items-center justify-center px-4 py-10"
    >
      <motion.div
        className="w-full max-w-2xl rounded-3xl p-8 md:p-12"
        style={{
          backgroundColor: cardBg,
          boxShadow: dark
            ? "0 4px 24px rgba(0,0,0,0.3)"
            : "0 4px 24px rgba(0,0,0,0.07)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ backgroundColor: inputSoftBg }}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: primary }}
              size="2x"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: text }}
          >
            Application Submitted!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-base md:text-lg"
            style={{ color: muted }}
          >
            Thank you for registering{" "}
            <span className="font-semibold" style={{ color: primary }}>
              {orgName}
            </span>
          </motion.p>
        </div>

        {/* Steps */}
        <div className="mb-8 px-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
                  style={{
                    backgroundColor: step.active ? primary : muted,
                  }}
                >
                  {step.number}
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.9 + index * 0.4,
                      ease: "easeOut",
                      transformOrigin: "top",
                    }}
                    className="w-0.5 mt-1 origin-top"
                    style={{
                      height: "42px",
                      backgroundColor: step.active
                        ? primary
                        : dark
                        ? "#334155"
                        : "#cbd5e1",
                    }}
                  />
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.75 + index * 0.4,
                  ease: "easeOut",
                }}
                className="pb-6"
              >
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: text }}
                >
                  {step.title}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: muted }}
                >
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.9, ease: "easeOut" }}
          className="w-full h-1 rounded-full mb-8 origin-left"
          style={{
            background: `linear-gradient(to right, ${primary}, #7c3aed)`,
          }}
        />

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 2.1 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: dark ? "#0f172a" : "#ffffff",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faClock} style={{ color: primary }} size="lg" />
              <p className="font-semibold text-sm" style={{ color: text }}>
                Expected Timeline
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              You'll typically receive approval within{" "}
              <span className="font-bold" style={{ color: text }}>
                24–48 hours
              </span>
              . We'll notify you via email once complete.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 2.25 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: dark ? "#0f172a" : "#ffffff",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faBolt} style={{ color: primary }} size="lg" />
              <p className="font-semibold text-sm" style={{ color: text }}>
                What's Next
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              Check your email for updates and set up your organization profile
              once approved.
            </p>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2.5 }}
          className="w-full text-center mt-8"
        >
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-sm transition hover:opacity-80"
            style={{ color: muted }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Home
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}