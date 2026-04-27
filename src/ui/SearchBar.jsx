import {
  faLocationDot,
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

function SearchBar({
  dark,
  maxDistance,
  setMaxDistance,
  sortOrder,
  setSortOrder,
  maxPossibleDistance,
}) {
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  const btnBase =
    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200";
  const btnActive =
    "bg-[rgb(65,15,199)] text-white border-[rgb(65,15,199)] shadow-md";
  const btnInactive = dark
    ? "bg-gray-800 text-gray-300 border-gray-600 hover:border-[rgb(65,15,199)] hover:text-[rgb(65,15,199)]"
    : "bg-gray-50 text-gray-600 border-gray-300 hover:border-[rgb(65,15,199)] hover:text-[rgb(65,15,199)]";

  const formatDistance = (m) => {
    if (m >= maxPossibleDistance) return "Any distance";
    if (m >= 1000) return `${(m / 1000).toFixed(1)}km`;
    return `${m}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border p-5 mb-4 shadow-sm ${cardBg}`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Max Distance Range */}
        <div className="flex-1 w-full">
          <label
            className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${subText}`}
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              style={{ color: dark ? "white" : "rgb(65,15,199)" }}
            />{" "}
            Max Distance :{" "}
            <span className="text-[rgb(65,15,199)] font-bold ms-1">
              {formatDistance(maxDistance)}
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={maxPossibleDistance}
            step={Math.ceil(maxPossibleDistance / 100)}
            value={maxDistance}
            onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
            className="w-full accent-[rgb(65,15,199)] cursor-pointer"
          />
          <div className={`flex justify-between text-xs mt-1 ${subText}`}>
            <span>0 km</span>
            <span>Any</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          className={`hidden md:block w-px self-stretch ${dark ? "bg-gray-700" : "bg-gray-200"}`}
        />

        {/* Sort Buttons */}
        <div className="flex-1 w-full">
          <span
            className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${subText}`}
          >
            Sort by Distance:
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSortOrder("asc")}
              className={`${btnBase} ${sortOrder === "asc" ? btnActive : btnInactive}`}
            >
              <FontAwesomeIcon icon={faArrowUpWideShort} />
              Nearest First
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`${btnBase} ${sortOrder === "desc" ? btnActive : btnInactive}`}
            >
              <FontAwesomeIcon icon={faArrowDownWideShort} />
              Farthest First
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchBar;