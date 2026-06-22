import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  ArrowRight,
  Loader2,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import ApplicationSubmitted from "./ApplicationSubmitted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../../themes/themes";
import Navbar from "../../ui/naveBar";

export default function CreateOrganizationForm() {
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? "false");
  });

  const [formData, setFormData] = useState({
    abbreviation: "",
    organizationName: "",
    officialEmail: "",
    chiefName: "",
    website: "",
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = () =>
      setDark(JSON.parse(localStorage.getItem("isDark") ?? "false"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setError("");
    setLocationLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          }));
          setLocationLoading(false);
        },
        () => {
          setError("Unable to get your location.");
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock submit until backend endpoint is connected
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const bg = dark ? themesMAP["light-main-bg"] : themesMAP["dark-main-bg"];
  const text = dark ? themesMAP["text-light"] : themesMAP["text-dark"];
  const cardBg = dark ? "#1e293b" : "#ffffff";
  const muted = dark ? "#94a3b8" : "#64748b";
  const borderColor = dark ? "#334155" : "#e2e8f0";
  const inputBg = dark ? "#0f172a" : "#ffffff";
  const primary = "#410fc7";
  const softBg = dark ? "#0f172a" : "#ede9fe";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} />

      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
        {submitted ? (
          <ApplicationSubmitted
            dark={dark}
            orgName={formData.organizationName || "your organization"}
          />
        ) : (
          <div
            className="w-full max-w-2xl rounded-3xl p-8 md:p-12"
            style={{
              backgroundColor: cardBg,
              boxShadow: dark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: softBg }}
                >
                  <Building2 className="w-10 h-10" style={{ color: primary }} />
                </div>

                <label
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors"
                  style={{
                    borderColor,
                    color: muted,
                    backgroundColor: "transparent",
                  }}
                >
                  <Upload className="w-5 h-5" style={{ color: primary }} />
                  <span className="text-sm font-medium">Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-12 h-12 rounded-lg object-cover"
                    style={{ border: `1px solid ${borderColor}` }}
                  />
                )}
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: text }}
              >
                Create Your Organization
              </h1>

              <p className="text-base md:text-lg" style={{ color: muted }}>
                Join our community and start making an impact
              </p>
            </div>

            {error && (
              <div
                className="mb-6 rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: dark ? "#3f1d1d" : "#fef2f2",
                  color: dark ? "#fca5a5" : "#b91c1c",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: text }}
                  >
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Organization Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: text }}
                  >
                    Abbreviation
                  </label>
                  <input
                    type="text"
                    name="abbreviation"
                    value={formData.abbreviation}
                    onChange={handleInputChange}
                    placeholder="Abbreviation (E.G, WHO)"
                    maxLength={10}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: text }}
                  >
                    Official Email
                  </label>
                  <input
                    type="email"
                    name="officialEmail"
                    value={formData.officialEmail}
                    onChange={handleInputChange}
                    placeholder="Official Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: text }}
                  >
                    Chief Name
                  </label>
                  <input
                    type="text"
                    name="chiefName"
                    value={formData.chiefName}
                    onChange={handleInputChange}
                    placeholder="Chief Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: text }}
                >
                  Website
                </label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: muted }}
                  />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://organization.com"
                    required
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: text }}
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    required
                    className="w-full px-4 py-3 pr-44 rounded-xl border-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: inputBg,
                      borderColor,
                      color: text,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 transition-colors hover:opacity-90"
                    style={{ backgroundColor: primary }}
                  >
                    {locationLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    {locationLoading ? "Getting..." : "Get Location"}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: text }}
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Organization description"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: inputBg,
                    borderColor,
                    color: text,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: primary }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Organization
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: muted }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" size="lg" />
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}