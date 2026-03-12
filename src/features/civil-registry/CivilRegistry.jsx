import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import BranchList from "./components/BranchList";

const BASE_URL = "http://localhost:8000";

function CivilRegistry() {
  const { dark } = useOutletContext();
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [maxDistance, setMaxDistance] = useState(5);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/branch`);
        setBranches(response.data);
      } catch (err) {
        setError("Failed to load branches. Make sure json-server is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const filteredBranches = branches.filter((branch) => {
    const matchesName = branch.branch_name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const simulatedDistance = (branch.branch_id * 0.37) % 5;
    const matchesDistance = simulatedDistance <= maxDistance;
    return matchesName && matchesDistance;
  });

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`min-h-screen px-4 py-8 md:px-10 lg:px-20 ${pageBg} transition-colors duration-300`}
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition ${textColor}`}
      >
        ← Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1
          className={`text-2xl md:text-3xl font-extrabold tracking-tight ${textColor}`}
        >
          Civil Registry — Branches
        </h1>
        <p className={`text-sm mt-1 ${subText}`}>
          {filteredBranches.length} branch
          {filteredBranches.length !== 1 ? "es" : ""} found
        </p>
      </motion.div>

      <SearchBar
        dark={dark}
        searchName={searchName}
        setSearchName={setSearchName}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
      />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      <BranchList branches={filteredBranches} dark={dark} loading={loading} />
    </div>
  );
}

export default CivilRegistry;
