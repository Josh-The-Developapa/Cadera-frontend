import React, { useState } from "react";
import "./Login.css";
import { FiMail, FiLock } from "react-icons/fi";
import LoggedOutHeader from "../../components/LoggedOutHeader/LoggedOutHeader";
import { apiFetch, getCurrentUser, userStorage } from "../../utils/apiFetch.js";
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
      // Step 1: Authenticate and set httpOnly cookie
      const loginResponse = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login success - Response:", loginResponse);

      // Step 2: Get user data from backend (which reads the httpOnly cookie)
      const userData = await getCurrentUser();
      
      if (!userData) {
        throw new Error("Failed to retrieve user data after login");
      }

      console.log("User data retrieved:", userData);

      // Extract role (handle both string and object formats)
      let role;
      if (userData.role) {
        role = typeof userData.role === 'object' ? userData.role.name : userData.role;
      } else {
        role = "user"; // fallback
      }

      console.log("Extracted role:", role);

      // Step 3: Store user data in localStorage
      userStorage.setUserData({
        name: userData.name,
        email: userData.email,
        role: role
      });

      // Step 4: Store role in context (existing functionality)
      login(role);
      
      console.log("User data stored, about to redirect...");

      // Use a small delay to ensure state is updated before redirect
      setTimeout(() => {
        if (loginResponse.mustChangePassword || userData.mustChangePassword) {
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
