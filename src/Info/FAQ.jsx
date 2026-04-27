import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";
import Navbar from "../ui/naveBar"; // 👈 adjust path if needed

const faqs = [
  {
    question: "How does SkipQ know the queue size?",
    answer:
      "SkipQ integrates with branch-installed cameras and IoT sensors configured by branch managers. The data is updated in real time so you always see an accurate count before you head out.",
  },
  {
    question: "Which services does SkipQ cover?",
    answer:
      "Currently SkipQ covers Civil Registry offices and banks (including ATMs). We're expanding to hospitals, government agencies, and more. Stay tuned.",
  },
  {
    question: "Is my location data stored?",
    answer:
      "No. Location access is only used to find nearby branches at the moment you request it. We do not store or share your GPS coordinates.",
  },
  {
    question: "Can I change the search radius?",
    answer:
      "Yes — Pro and Enterprise users can set a custom radius. Free users get a default radius that covers most urban areas.",
  },
  {
    question: "What is the Branch Manager role?",
    answer:
      "A Branch Manager has dashboard access for their specific branch. They can see queue data, manage services, and configure camera integrations — but only for their own branch.",
  },
  {
    question: "What does the Super Admin see?",
    answer:
      "Super Admins have full visibility across all branches belonging to their organization. They can configure cameras, manage all branch managers, and access organization-wide analytics.",
  },
  {
    question: "How do ATM details work?",
    answer:
      "For each ATM you can see: whether it's operational, available services (withdrawal/deposit), max withdrawal limit, and how many people are currently in queue.",
  },
  {
    question: "Is SkipQ free to use?",
    answer:
      "Yes — the Free plan covers basic queue viewing and directions. Pro and Enterprise plans unlock advanced features like ATM details, custom radius, and admin dashboards.",
  },
];

export default function FAQ() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });
  const [openIndex, setOpenIndex] = useState(null);

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
      <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
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
            FAQ
          </span>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ color: text }}
          >
            Frequently asked questions
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: muted }}>
            Everything you need to know about SkipQ.
          </p>
        </motion.div>
      </section>

      {/* Accordion */}
      <section className="lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="mb-4 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: cardBg,
              boxShadow: dark
                ? "0 2px 12px rgba(0,0,0,0.3)"
                : "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span
                className="font-semibold text-base pr-4"
                style={{ color: text }}
              >
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{
                    color: openIndex === i ? "#410fc7" : muted,
                    flexShrink: 0,
                  }}
                />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <p
                    className="px-6 pb-6 text-sm leading-relaxed"
                    style={{ color: muted }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>
    </div>
  );
}