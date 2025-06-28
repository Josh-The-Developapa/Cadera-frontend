// src/layout/MainLayout.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import NavMenu from '../../components/NavMenu/NavMenu';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'; // Optional: styles for layout

const MainLayout = () => {
  return (
    <div className="body-container">
      <Header />
      <NavMenu />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
