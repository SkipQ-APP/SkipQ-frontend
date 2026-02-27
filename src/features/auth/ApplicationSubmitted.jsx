import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaperPlane,
  faShield,
  // faCircleCheck as faCheckFinal,
  faClock,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../../themes/themes";
import { motion } from "framer-motion";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";

export default function ApplicationSubmitted({
  dark = true,
  orgName = "your organization",
}) {
  const textColor = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const bgColor = dark ? themesMAP["dark-main-bg"] : themesMAP["light-main-bg"];

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
      style={{ background: bgColor, color: textColor, minHeight: "100vh" }}
      className="flex items-center justify-center px-4 py-10 rounded-xl"
    >
      <motion.div
        className="w-full max-w-md shadow-lg shadow-gray-400 p-5 rounded-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="
            w-16 h-16 rounded-full
            bg-blue-600
            flex items-center justify-center
            
          "
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-white"
              size="2x"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Application Submitted!
          </h1>

          <p
            className="text-sm"
            style={{ color: dark ? "#94a3b8" : "#64748b" }}
          >
            Thank you for registering{" "}
            <span className="text-blue-500 font-semibold">{orgName}</span>
          </p>
        </div>

        <div className="mb-6 px-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    text-sm font-bold shrink-0
                  `}
                  style={{
                    background: step.active ? "#2563eb" : "#94a3b8",
                  }}
                >
                  {step.number}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="w-0.5 mt-1"
                    style={{
                      height: "40px",
                      background: step.active
                        ? "#2563eb"
                        : dark
                          ? "#334155"
                          : "#cbd5e1",
                    }}
                  />
                )}
              </div>

              <div className="pb-6">
                <p
                  className="font-bold text-sm mb-0.5"
                  style={{
                    color: dark
                      ? themesMAP["text-dark"]
                      : themesMAP["text-light"],
                  }}
                >
                  {step.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: dark ? "#94a3b8" : "#64748b" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="w-full h-1 rounded-full mb-6"
          style={{ background: "linear-gradient(to right, #2563eb, #60a5fa)" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-4 shadow-xl"
            style={{ background: bgColor, border: "0.5px solid #e4e4e4" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                icon={faClock}
                className="text-blue-500"
                size="lg"
              />
              <p
                className="font-semibold text-sm"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                Expected Timeline
              </p>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: dark ? "#94a3b8" : "#64748b" }}
            >
              You'll typically receive approval within{" "}
              <span
                className="font-bold"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                24-48 hours
              </span>
              . We'll notify you via email once complete.
            </p>
          </div>

          <div
            className="rounded-xl p-4 shadow-xl "
            style={{ background: bgColor, border: "0.5px solid #e4e4e4" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                icon={faBolt}
                className="text-blue-500"
                size="lg"
              />
              <p
                className="font-semibold text-sm"
                style={{
                  color: dark
                    ? themesMAP["text-dark"]
                    : themesMAP["text-light"],
                }}
              >
                What's Next
              </p>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: dark ? "#94a3b8" : "#64748b" }}
            >
              Check your email for updates and set up your organization profile
              once approved.
            </p>
          </div>
        </div>
        <div className="w-full text-center mt-3">
          {" "}
          <button
            className="font-semibold text-[15px] text-center"
            style={{
              color: !dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            <NavLink to="/" className=" rounded-xl shadow-xs  px-4 py-2.5">
              <FontAwesomeIcon icon={faHouse} />
              Back to Home
            </NavLink>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
