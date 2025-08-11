import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    setUser(stored ? JSON.parse(stored) : null);
    setLoading(false);  // loading finished
  }, []);

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
    window.localStorage.setItem("auth_event", Date.now().toString());
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.localStorage.setItem("auth_event", Date.now().toString());
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
