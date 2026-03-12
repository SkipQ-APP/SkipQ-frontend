import { motion, AnimatePresence } from "framer-motion";
import BranchCard from "./BranchCard";

function BranchList({ branches, dark, loading }) {
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-[rgb(65,15,199)] border-t-transparent"
        />
        <p className={`text-sm ${subText}`}>Loading branches...</p>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 gap-3"
      >
        <span className="text-5xl">🏢</span>
        <p className={`text-lg font-semibold ${textColor}`}>
          No branches found
        </p>
        <p className={`text-sm ${subText}`}>
          Try adjusting your search or distance filter
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-2">
        {branches.map((branch, index) => (
          <BranchCard
            key={branch.branch_id}
            branch={branch}
            index={index}
            dark={dark}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}

export default BranchList;
