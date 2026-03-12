import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleCheck,
  faCircleXmark,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function ServiceCard({ service, index, dark, onSelect }) {
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const waitingCount = ((service.service_id * 3) % 9) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      className={`rounded-2xl border p-5 shadow-sm flex flex-col gap-3 ${cardBg}`}
    >
      <div className="flex items-start justify-between">
        <h3 className={`text-base font-bold ${textColor}`}>
          {service.service_name}
        </h3>
        {service.isActive ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 mt-0.5"
            size="lg"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-red-400 mt-0.5"
            size="lg"
          />
        )}
      </div>

      {service.isActive ? (
        <div className={`flex items-center gap-2 text-sm ${subText}`}>
          <FontAwesomeIcon
            icon={faUserGroup}
            style={{ color: "rgb(65,15,199)" }}
          />
          <span>
            <span className="font-bold" style={{ color: "rgb(65,15,199)" }}>
              {waitingCount}
            </span>{" "}
            waiting
          </span>
        </div>
      ) : (
        <p className="text-red-400 text-sm font-medium">Currently Closed</p>
      )}

      {service.isActive && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(service)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide"
          style={{ background: "rgb(65,15,199)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgb(85,35,219)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgb(65,15,199)")
          }
        >
          Select Service
        </motion.button>
      )}
    </motion.div>
  );
}

function ServicesList({
  services,
  searchService,
  setSearchService,
  onSelectService,
  dark,
}) {
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const textColor = dark ? "text-white" : "text-gray-900";
  const inputBg = dark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500"
    : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-2xl border p-5 shadow-sm ${cardBg}`}
    >
      <h2 className={`text-xl font-extrabold mb-4 ${textColor}`}>
        Available Services
      </h2>

      <div className="relative mb-5">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3.5 top-1/2 -translate-y-1/2"
          style={{ color: dark ? "#6b7280" : "#9ca3af" }}
        />
        <input
          type="text"
          value={searchService}
          onChange={(e) => setSearchService(e.target.value)}
          placeholder="Search for a service..."
          className={`w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[rgb(65,15,199)] transition ${inputBg}`}
        />
      </div>

      <AnimatePresence>
        {services.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-10 text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            No services found
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.service_id}
                service={service}
                index={index}
                dark={dark}
                onSelect={onSelectService}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ServicesList;
