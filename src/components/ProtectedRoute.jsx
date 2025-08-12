import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { role } = useAuth();
  return role ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

