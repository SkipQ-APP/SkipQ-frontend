import { useState } from "react";

import { NavLink } from "react-router-dom";

import themesMAP from "../../../themes/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../contexts/useAuth";
export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? false);
  });
const {login} = useAuth();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        background: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
        minHeight: "100vh",
        color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
      }}
      className="flex items-center justify-center"
    >
      <motion.div
        className="
        min-h-scree
        flex items-center justify-center 
        px-4 py-8
w-full max-w-md
shadow-lg rounded-xl
      "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}

        // style={{ width: "50%" }}
      >
        <div
          className="
          w-full max-w-md
          
          rounded-2xl shadow-lg
        shadow-gray-600
          p-6 sm:p-8
        "
        >
          <div className="mb-6 flex items-center justify-between">
            <NavLink
              to="/"
              className="
                flex items-center gap-1
                text-blue-600 dark:text-blue-400
                text-sm font-medium
                hover:underline transition-all
              "
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                className="text-black"
                size="lg"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              />
              Back to Home
            </NavLink>
            <button
              onClick={() =>
                setDark((prev) => {
                  localStorage.setItem("isDark", JSON.stringify(!prev));
                  return !prev;
                })
              }
            >
              <FontAwesomeIcon
                icon={dark ? faSun : faMoon}
                className="text-black"
                size="lg"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="
                w-9 h-9 rounded-lg
                bg-blue-600
                flex items-center justify-center
                text-white font-bold text-lg
              "
              >
                S
              </div>
              <span className="text-xl font-bold">SkipQ</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold   mb-1">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="
                bg-red dark:bg-red-200
                border border-red-200 dark:border-red-300
                text-red-300 dark:text-red-800
                text-sm rounded-lg px-4 py-3
                font-bold
              "
              >
                {error}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="text-black ms-3"
                  size="lg"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold  mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full px-4 py-2.5
                  border border-gray-500 dark:border-gray-300
                  rounded-lg
                shadow-lg 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all text-sm
                "
              />
            </div>

            <div>
              <label className="block text-sm font-semibold  mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full px-4 py-2.5 pr-12
                    border border-gray-500 dark:border-gray-300
                    rounded-lg
                    shadow-lg 
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all text-sm
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                    transition-colors
                  "
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-black"
                    size="lg"
                    style={{
                      color: dark
                        ? themesMAP["text-light"]
                        : themesMAP["text-dark"],
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="
                    w-4 h-4 rounded
                    text-blue-600 accent-blue-600
                    cursor-pointer
                  "
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>

              <NavLink
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3
                bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                text-white font-semibold text-sm
                rounded-lg
                transition-all duration-200
                flex items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-black"
                  size="lg"
                  style={{
                    color: dark
                      ? themesMAP["text-light"]
                      : themesMAP["text-dark"],
                  }}
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
