import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBuilding,
  faListCheck,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";
import Navbar from "../ui/naveBar"; // 👈 same navbar style as FAQ

const steps = [
  {
    number: "01",
    icon: faLocationDot,
    title: "Share Your Location",
    description:
      "Grant location access and SkipQ instantly finds all nearby services — civil registry offices, banks, ATMs — within your chosen radius.",
    color: "#410fc7",
  },
  {
    number: "02",
    icon: faBuilding,
    title: "Pick a Service",
    description:
      "Browse available branches. See real-time status: open or closed, which counters are active, and how many people are waiting at each one.",
    color: "#410fc7",
  },
  {
    number: "03",
    icon: faListCheck,
    title: "Check Queue & Services",
    description:
      "Dive into each branch. View live queue counts per service, ATM cash availability, max withdrawal limits, and operational status.",
    color: "#410fc7",
  },
  {
    number: "04",
    icon: faMapLocationDot,
    title: "Navigate There",
    description:
      "Tap directions and get routed to your chosen branch via Google Maps — turn-by-turn from your current location.",
    color: "#410fc7",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HowItWorks() {
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

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      {/* Shared Navbar */}
      <Navbar dark={dark} setDark={setDark} />

      {/* Hero */}
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full mb-6"
            style={{
              backgroundColor: dark ? "#1e293b" : "#ede9fe",
              color: "#410fc7",
            }}
          >
            How It Works
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            style={{ color: text }}
          >
            Skip the line, <span style={{ color: "#410fc7" }}>not the service.</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto" style={{ color: muted }}>
            SkipQ gives you live queue data for every branch near you — so you
            walk in at the right time, every time.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                backgroundColor: cardBg,
                boxShadow: dark
                  ? "0 4px 24px rgba(0,0,0,0.3)"
                  : "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: dark ? "#0f172a" : "#ede9fe" }}
                >
                  <FontAwesomeIcon
                    icon={step.icon}
                    style={{ color: "#410fc7" }}
                    size="lg"
                  />
                </div>

                <div>
                  <span
                    className="text-5xl font-black opacity-10 absolute right-6 top-4"
                    style={{ color: "#410fc7" }}
                  >
                    {step.number}
                  </span>

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: text }}
                  >
                    {step.title}
                  </h3>

                  <p style={{ color: muted }}>{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: text }}>
            Ready to skip the queue?
          </h2>

          <NavLink to="/">
            <button
              style={{ backgroundColor: "#410fc7" }}
              className="text-white rounded-xl font-semibold px-8 py-3 mt-2 hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </button>
          </NavLink>
        </motion.div>
      </section>
    </div>
  );
}