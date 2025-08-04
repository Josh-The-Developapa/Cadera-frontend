import React, { useState } from "react";
import "./Login.css";
import { FiMail, FiLock } from "react-icons/fi";
import LoggedOutHeader from "../../components/LoggedOutHeader/LoggedOutHeader";
import { apiFetch } from "../../utils/apiFetch.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [whoamiInfo, setWhoamiInfo] = useState(null); // removed for now

  const handleLogin = async () => {
    setError("");
    // setWhoamiInfo(null); // clear previous info
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log("Login success:", data);

      // 👇 removed: whoami fetch
      // const whoami = await apiFetch("/whoami", {
      //   method: "GET",
      // });
      // console.log("Whoami response:", whoami);
      // setWhoamiInfo(whoami);

      const shouldRedirect = true;
      if (shouldRedirect) {
        if (data.mustChangePassword) {
          window.location.href = "/change-password";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
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
          />
        </div>

        <div className="input-group">
          <FiLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          className="text-black text-right text-sm mb-4 cursor-pointer w-[80%]"
          style={{ color: "#003459" }}
        >
          Forgot password?
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* 
        {whoamiInfo && (
          <div className="text-green-700 text-sm mb-2">
            Logged in as: {whoamiInfo.email || JSON.stringify(whoamiInfo)}
          </div>
        )} 
        */}

        <button className="login-btn" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;

