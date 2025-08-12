import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      const { role, expiry } = JSON.parse(storedData);
      if (Date.now() < expiry) {
        setRole(role);

        // Schedule auto logout
        const timeout = expiry - Date.now();
        setTimeout(() => logout(), timeout);
      } else {
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const login = (role) => {
    const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    localStorage.setItem("authData", JSON.stringify({ role, expiry }));
    setRole(role);

    // Schedule auto logout
    setTimeout(() => logout(), 2 * 60 * 60 * 1000);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

