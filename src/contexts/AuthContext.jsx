import { createContext,useEffect } from "react";

import { useState } from "react";
import* as authService from "../services/auth";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

  //  Signup
  const signup = async (data) => {
    const res = await authService.signupRequest(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };
  //  login
  const login = async (data) => {
    const res = await authService.loginRequest(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };
  // logout
   const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Load user on app start
 useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          
          return;
        }

        const res = await authService.getMeRequest();
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);
    return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export  { AuthContext, AuthProvider };