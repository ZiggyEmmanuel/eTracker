import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      // First, ensure CSRF token is set
      await axios.get("/api/csrf/");

      const response = await axios.get("/api/auth/status/", {
        withCredentials: true,
      });

      setIsAuthenticated(response.data.isAuthenticated);
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      // Get fresh CSRF token
      const csrfResponse = await axios.get("/api/csrf/");
      const token = csrfResponse.data.csrfToken; // Store the token in a variable

      // Include the token explicitly in the logout request
      await axios.post(
        "/api/logout/",
        {},
        {
          headers: {
            "X-CSRFToken": token, // Use the variable here
          },
        }
      );

      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      if (error.response) {
        console.error("Logout failed:", error.response.data);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
