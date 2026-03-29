import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────
// Reusable: Bill Badge
// ─────────────────────────────────────────────
function BillBadge({ amount }) {
  return (
    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">
      {amount}
    </span>
  );
}

// ─────────────────────────────────────────────
// Reusable: Service Badge
// ─────────────────────────────────────────────
function ServiceBadge({ label }) {
  const isDeposit = label.toLowerCase() === "deposit";
  return (
    <span
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border
        ${isDeposit
          ? "bg-green-50 text-green-600 border-green-200"
          : "bg-blue-50 text-blue-600 border-blue-200"
        }`}
    >
      {isDeposit ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      )}
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Reusable: ATM Card
// ─────────────────────────────────────────────
function ATMCard({ atm }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-800">{atm.name}</h2>
        <div className="flex items-center gap-1 mt-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-slate-400 text-xs">{atm.area}</span>
        </div>
        <p className="text-slate-400 text-xs mt-0.5">{atm.distance} away</p>
      </div>

      {/* Bills & Services */}
      <div className="flex gap-8 mb-5">
        {/* Bills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Bills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.bills || []).map((b) => (
              <BillBadge key={b} amount={b} />
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Services</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(atm.services || []).map((s) => (
              <ServiceBadge key={s} label={s} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link to={`/banks/${atm.bankName}/atms/${atm.id}`}>
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150"
      >
        View Details &amp; Location
      </button>
        </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// Reusable: Distance Slider
// ─────────────────────────────────────────────
function DistanceSlider({ value, min, max, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="w-48">
      <div className="flex items-center gap-1.5 mb-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="text-sm text-slate-600 font-medium">
          Distance: <span className="text-blue-600 font-semibold">{value}m</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #3b82f6 ${pct}%, #e2e8f0 ${pct}%)`,
        }}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-blue-600
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
        <span>{min}m</span>
        <span>{max}m</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Reusable: Sort Dropdown
// ─────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "nearest",  label: "Nearest First" },
  { value: "farthest", label: "Farthest First" },
  { value: "name",     label: "Name A–Z" },
];

function SortDropdown({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium
                     pl-3 pr-9 py-2.5 rounded-xl outline-none cursor-pointer
                     focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sample Data  (replace with your fetched data)
// ─────────────────────────────────────────────
const ATMS = [
  {
    id: 1,
    name: "NBE Downtown",
    area: "Cairo Downtown",
    distance: "0.3km",
    distanceM: 300,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 2,
    name: "NBE Zamalek",
    area: "Zamalek",
    distance: "0.8km",
    distanceM: 800,
    bills: [100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
  {
    id: 3,
    name: "NBE Heliopolis",
    area: "Heliopolis",
    distance: "1.2km",
    distanceM: 1200,
    bills: [50, 100, 200],
    services: ["Withdraw"],
  },
  {
    id: 4,
    name: "NBE Maadi",
    area: "Maadi",
    distance: "1.8km",
    distanceM: 1800,
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
  },
];

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ATMList({ bankName = "National Bank of Egypt" }) {
  const [distance, setDistance] = useState(2000);
  const [sort, setSort]         = useState("nearest");

  const filtered = useMemo(() => {
    const list = ATMS.filter((a) => a.distanceM <= distance);
    if (sort === "nearest")  return [...list].sort((a, b) => a.distanceM - b.distanceM);
    if (sort === "farthest") return [...list].sort((a, b) => b.distanceM - a.distanceM);
    if (sort === "name")     return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [distance, sort]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Page Header */}
        <div className="flex items-center gap-2 mb-6">
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">
            ATM Machines –&nbsp;<span className="text-blue-600">{bankName}</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-end justify-between gap-4">
          <DistanceSlider
            value={distance}
            min={100}
            max={2000}
            onChange={setDistance}
          />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* ATM Cards */}
        {filtered.length > 0 ? (
          filtered.map((atm) => (
            <ATMCard
              key={atm.id}
              atm={atm}
            //   onViewDetails={(a) => alert(`Viewing: ${a.name}`)}
            />
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 text-sm">
            No ATMs found within {distance}m.
          </div>
        )}
      </div>
    </div>
  );
}