import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

function SearchBar({
  dark,
  searchName,
  setSearchName,
  maxDistance,
  setMaxDistance,
}) {
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const subText = dark ? "text-gray-400" : "text-gray-500";
  const inputBg = dark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500"
    : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border p-5 mb-6 shadow-sm ${cardBg}`}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <label
            className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${subText}`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-black"
              size="lg"
              style={{
                color: dark ? "white" : "rgb(65,15,199)",
              }}
            />{" "}
            Search by Name
          </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="e.g. Cairo Downtown..."
            className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[rgb(65,15,199)] transition ${inputBg}`}
          />
        </div>

        <div
          className={`hidden md:block w-px h-12 ${dark ? "bg-gray-700" : "bg-gray-200"}`}
        />

        <div className="flex-1 w-full">
          <label
            className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${subText}`}
          >
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-black"
              size="lg"
              style={{
                color: dark ? "white" : "rgb(65,15,199)",
              }}
            />
            Max Distance :
            <span className="text-[rgb(65,15,199)] font-bold ms-1">
              {maxDistance} km
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={maxDistance}
            onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
            className="w-full accent-[rgb(65,15,199)] cursor-pointer"
          />
          <div className={`flex justify-between text-xs mt-1 ${subText}`}>
            <span>0 km</span>
            <span>5 km</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchBar;
