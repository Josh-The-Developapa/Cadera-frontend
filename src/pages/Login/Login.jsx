import React from 'react';
import './Login.css';
import { FiMail, FiLock } from 'react-icons/fi';
import Header from '../../components/Header/Header';

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <div className="login-modal">
        <h1 className="login-heading">Welcome Back</h1>
        <div className="input-group">
          <FiMail className="icon" />
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="input-group">
          <FiLock className="icon" />
          <input type="password" placeholder="Password" />
        </div>

        <div
          className="text-black text-right text-sm mb-4 cursor-pointer w-[80%]"
          style={{ color: '#003459' }}
        >
          Forgot password?
        </div>
        <button className="login-btn">LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
