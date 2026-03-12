import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleCheck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ServiceModal({ service, dark, onClose }) {
  const modalBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const windowBg = dark
    ? "bg-gray-800 border-gray-600"
    : "bg-gray-50 border-gray-200";

  const window1Count = ((service.service_id * 2) % 5) + 1;
  const window2Count = ((service.service_id * 3) % 4) + 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed z-50 inset-0 m-auto h-fit
  w-[90%] max-w-md rounded-2xl border shadow-2xl p-6 ${modalBg}`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-extrabold ${textColor}`}>
            {service.service_name}
          </h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition hover:opacity-70 ${
              dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 mb-5">
          <FontAwesomeIcon icon={faCheck} className="text-green-500" />
          <span className="text-green-700 text-sm font-medium">
            This service is currently available
          </span>
        </div>

        <p className={`text-sm font-semibold mb-3 ${textColor}`}>
          Service available at Window 1 &amp; Window 2
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${windowBg}`}
          >
            <span className={`text-sm ${subText}`}>Window 1:</span>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUserGroup}
                style={{ color: "rgb(65,15,199)" }}
                size="sm"
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "rgb(65,15,199)" }}
              >
                {window1Count} people in queue
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 }}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 ${windowBg}`}
          >
            <span className={`text-sm ${subText}`}>Window 2:</span>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUserGroup}
                style={{ color: "rgb(65,15,199)" }}
                size="sm"
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "rgb(65,15,199)" }}
              >
                {window2Count} people in queue
              </span>
            </div>
          </motion.div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide"
          style={{ background: "rgb(65,15,199)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgb(85,35,219)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgb(65,15,199)")
          }
        >
          Close
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default ServiceModal;
