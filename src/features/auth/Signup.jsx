import { useState } from "react";
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
import useAuth from "../../contexts/useAuth";

export default function CreateOrganizationForm() {
  const [formData, setFormData] = useState({
    abbreviation: "",
    organizationName: "",
    officialEmail: "",
    chiefName: "",
    website: "",
    location: "",
    description: "",
  });
const {signup} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log(error);
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
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
        (error) => {
          console.error(error);
          setLocationLoading(false);
        }
      );
    } else {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSubmitted(true);
  try {
    await signup(formData);
    setSubmitted(true); // show success
  } catch (err) {
    setError(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
    // Optionally, reset the form after showing success
    setFormData({
      abbreviation: "",
      organizationName: "",
      officialEmail: "",
      chiefName: "",
      website: "",
      location: "",
      description: "",
    });
    setLogoPreview(null);
  }
};
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0f4f9]">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="p-4 rounded-full bg-[#6089da]">
              <Building2 className="w-10 h-10 text-white" />
            </div>

            <label className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors hover:bg-gray-50">
              <Upload className="w-5 h-5 text-[#6089da]" />
              <span className="text-sm font-medium text-gray-700">
                Upload Logo
              </span>
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
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              />
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create Your Organization
          </h1>

          <p className="text-gray-500 text-base md:text-lg">
            Join our community and start making an impact
          </p>
        </div>

        {submitted ? (
         <ApplicationSubmitted />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="abbreviation" className="block text-sm font-semibold  mb-1">Abbreviation</label>
              <input
                type="text"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleInputChange}
                placeholder="Abbreviation (E.G, WHO)"
                maxLength={10}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
              </div>
              <div>
              <label htmlFor="organizationName" className="block text-sm font-semibold  mb-1">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Organization Name"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <label htmlFor="officialEmail" className="block text-sm font-semibold  mb-1">Official Email</label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleInputChange}
                placeholder="Official Email"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
              </div>
              <div>
              <label htmlFor="chiefName" className="block text-sm font-semibold  mb-1">Chief Name</label>
              <input
                type="text"
                name="chiefName"
                value={formData.chiefName}
                onChange={handleInputChange}
                placeholder="Chief Name"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
              </div>
            </div>

            {/* Website */}
            <div>
            <label htmlFor="website" className="block text-sm font-semibold  mb-1">Website</label>

            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://organization.com"
                required
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
            </div>
            </div>
            {/* Location */}
            <div>
            <label htmlFor="location" className="block text-sm font-semibold  mb-1">Location</label>

            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                required
                className="w-full px-4 py-3 pr-44 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locationLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-[#6089da] text-white text-sm flex items-center gap-2"
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
            {/* Description */}
            <div>
            <label htmlFor="description" className="block text-sm font-semibold  mb-1">Description</label>

            
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Organization description"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6089da] focus:outline-none resize-none"
            />
            </div>
            {/* {error && <span className="text-red-500 text-sm">{error}</span>} */}
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#6089da] flex items-center justify-center gap-2"
              onSubmit={handleSubmit}
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
        )}
      </div>

      <div className="mt-8">
        <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
}