import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import themesMAP from "../../../themes/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faSpinner,
  faHouse,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash, faCircle } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../ui/naveBar"; // adjust path if needed
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";


const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

const fadeSlideDown = (delay = 0) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

export default function SetPassword() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const inputBg = dark ? "#0f172a" : "#ffffff";
  const primary = "#410fc7";
  const success = "#16a34a";

  const validations = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "At least one capital character",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one small character",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Use symbols",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const allValid = validations.every((item) => item.valid);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!allValid) {
      setError("Please satisfy all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Password set successfully");
    }, 1000);
  };
  const { token } = useParams();
if (!token) {
    return <Navigate to="/login" replace />;
  }
  console.log(token);
  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} />

      <motion.div
        className="flex items-center justify-center px-4 py-8"
        style={{ color: text, minHeight: "calc(100vh - 80px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: -40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="w-full rounded-3xl p-8 md:p-12"
            style={{
              backgroundColor: cardBg,
              boxShadow: dark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            {/* Back */}
            <motion.div
              className="mb-6 flex items-center justify-between"
              {...fadeSlideDown(0.1)}
            >
              <NavLink
                to="/"
                className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: muted }}
              >
                <motion.span
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FontAwesomeIcon icon={faHouse} size="lg" />
                </motion.span>
                Back to Home
              </NavLink>
            </motion.div>

            {/* Header */}
            <motion.div className="mb-8" {...fadeSlideUp(0.15)}>
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: primary }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  S
                </motion.div>

                <motion.span
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  style={{ color: text }}
                >
                  SkipQ
                </motion.span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ color: text }}
              >
                Set Your Password
              </motion.h1>

              <motion.p
                className="text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                style={{ color: muted }}
              >
                Choose a strong password to secure your account
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Password */}
              <motion.div {...fadeSlideUp(0.4)}>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: text }}
                >
                  Password
                </label>

                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />

                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: muted }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showPassword ? "eye" : "eyeSlash"}
                        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          size="lg"
                        />
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              {/* Restrictions */}
              <motion.div
                className="space-y-3"
                {...fadeSlideUp(0.5)}
              >
                {validations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={item.valid ? faCheckCircle : faCircle}
                      style={{ color: item.valid ? success : muted }}
                    />
                    <p style={{ color: item.valid ? success : muted }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Confirm Password */}
              <motion.div {...fadeSlideUp(0.6)}>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: text }}
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <motion.input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 focus:outline-none transition-all text-sm"
                    style={{
                      backgroundColor: inputBg,
                      borderColor:
                        confirmPassword.length === 0
                          ? borderColor
                          : passwordsMatch
                          ? success
                          : "#dc2626",
                      color: text,
                    }}
                  />

                  <motion.button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: muted }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showConfirmPassword ? "eye" : "eyeSlash"}
                        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEye : faEyeSlash}
                          size="lg"
                        />
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>

                {confirmPassword.length > 0 && (
                  <p
                    className="mt-2 text-sm"
                    style={{ color: passwordsMatch ? success : "#dc2626" }}
                  >
                    {passwordsMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    className="rounded-xl px-4 py-3 text-sm font-semibold"
                    style={{
                      backgroundColor: dark ? "#3f1d1d" : "#fef2f2",
                      color: dark ? "#fca5a5" : "#b91c1c",
                      border: `1px solid ${dark ? "#7f1d1d" : "#fecaca"}`,
                    }}
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: primary }}
                {...fadeSlideUp(0.7)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="spinner"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faSpinner} size="lg" spin />
                      Saving...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="save"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      Set Password
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}