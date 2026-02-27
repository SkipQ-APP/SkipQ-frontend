import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
export const loginRequest = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const signupRequest = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

