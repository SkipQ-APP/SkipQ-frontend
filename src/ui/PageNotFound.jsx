import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useState, useEffect } from "react";
import themesMAP from "../../themes/themes";

export default function PageNotFound() {
  const [dark, setDark] = useState(() =>
    JSON.parse(localStorage.getItem("isDark") ?? "false")
  );

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
  const border = dark ? "#334155" : "#e2e8f0";
  const primary = "#410fc7";
  const softBg = dark ? "#0f172a" : "#ede9fe";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-2xl rounded-3xl p-8 md:p-12 text-center"
        style={{
          backgroundColor: cardBg,
          boxShadow: dark
            ? "0 4px 24px rgba(0,0,0,0.3)"
            : "0 4px 24px rgba(0,0,0,0.07)",
          border: `1px solid ${border}`,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: softBg }}
        >
          <SearchX size={42} style={{ color: primary }} />
        </motion.div>

        {/* 404 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-3"
          style={{ color: primary }}
        >
          404
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          style={{ color: text }}
        >
          Page not found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8"
          style={{ color: muted }}
        >
          Sorry, the page you’re looking for doesn’t exist, was moved, or the
          link may be incorrect.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
        >
          <NavLink
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: primary }}
          >
            <Home size={18} />
            Back to Home
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold border transition hover:opacity-85"
            style={{
              color: text,
              borderColor: border,
              backgroundColor: "transparent",
            }}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>

        {/* Small footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-8 text-xs sm:text-sm"
          style={{ color: muted }}
        >
          If you think this is a mistake, please check the URL and try again.
        </motion.p>
      </motion.div>
    </div>
  );
}