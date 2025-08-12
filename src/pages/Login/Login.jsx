import React, { useState } from "react";
import "./Login.css";
import { FiMail, FiLock } from "react-icons/fi";
import LoggedOutHeader from "../../components/LoggedOutHeader/LoggedOutHeader";
import { apiFetch } from "../../utils/apiFetch.js";
import { useAuth } from "../../auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login success - Full response:", data);

      // Check what role data we actually received
      // Handle both string roles and Prisma Role objects
      let role;
      if (data.role) {
        // If role is an object (Prisma Role model), extract the name
        role = typeof data.role === 'object' ? data.role.name : data.role;
      } else if (data.user?.role) {
        role = typeof data.user.role === 'object' ? data.user.role.name : data.user.role;
      } else {
        role = "user"; // fallback
      }
      
      console.log("Raw role data:", data.role);
      console.log("Extracted role:", role);

      if (!role) {
        console.warn("No role found in response, using default 'user'");
        role = "user";
      }

      // Store role in context + localStorage with expiry
      login(role);
      
      console.log("Role stored, about to redirect...");

      // Use a small delay to ensure state is updated before redirect
      setTimeout(() => {
        if (data.mustChangePassword) {
          window.location.href = "/change-password";
        } else {
          window.location.href = "/dashboard";
        }
      }, 100);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <LoggedOutHeader />
      <div className="login-modal">
        <h1 className="login-heading">Welcome Back</h1>

        <div className="input-group">
          <FiMail className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <FiLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </div>

        <div
          className="text-black text-right text-sm mb-4 cursor-pointer w-[80%]"
          style={{ color: "#003459" }}
        >
          Forgot password?
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button 
          className="login-btn" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Login;
