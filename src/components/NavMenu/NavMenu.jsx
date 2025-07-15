import React, { useState } from 'react';
import './NavMenu.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CaderaLogo from '../../assets/cadera-logo.png';

import AdminIcon from '../../assets/user-multiple-group--close-geometric-human-multiple-person-up-user.svg';

import {
  LayoutDashboard as OverViewIcon,
  Settings as SettingsIcon,
  BookOpen as GradesIcon,
  FileText as ReportsIcon,
  ChartPie as AnalyticsIcon,
} from 'lucide-react';

function NavMenu() {
  const location = useLocation();

  const handleAdminClick = () => {
    navigate('/admin/students');
  };

  return (
    <div className="nav-menu">
      <NavLink to="/">
        <img
          src={CaderaLogo}
          alt="Cadera-Logo"
          className="header-logo"
          style={{ marginBottom: '50px', width: 'auto', height: '20px' }}
        />
      </NavLink>
      <div className="nav-link-container">
        {/* Overview */}
        <div
          className={`nav-link-div ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          <OverViewIcon className="nav-link-icon" />
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Overview
          </NavLink>
        </div>

        {/* Admin */}
        <div
          className={`nav-link-div ${
            location.pathname.startsWith('/admin') ? 'active' : ''
          }`}
          style={{ cursor: 'pointer' }}
        >
          <img src={AdminIcon} alt="Admin" className="nav-link-icon" />
          <span
            className={
              location.pathname.startsWith('/admin')
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Admin
          </span>
        </div>

        {/* Submenu for Admin */}

        <div className="admin-submenu">
          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              isActive ? 'admin-sub-link active' : 'admin-sub-link'
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/admin/teachers"
            className={({ isActive }) =>
              isActive ? 'admin-sub-link active' : 'admin-sub-link'
            }
          >
            Teachers
          </NavLink>
          <NavLink
            to="/admin/classes"
            className={({ isActive }) =>
              isActive ? 'admin-sub-link active' : 'admin-sub-link'
            }
          >
            Classes
          </NavLink>
        </div>

        {/* Other Menu Items */}
        <div
          className={`nav-link-div ${
            location.pathname === '/grades' ? 'active' : ''
          }`}
        >
          <GradesIcon className="nav-link-icon" />
          <NavLink
            to="/grades"
            className={({ isActive }) =>
              isActive
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Grades
          </NavLink>
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/reports' ? 'active' : ''
          }`}
        >
          <ReportsIcon className="nav-link-icon" />
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Reports
          </NavLink>
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/analytics' ? 'active' : ''
          }`}
        >
          <AnalyticsIcon className="nav-link-icon" />
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Analytics
          </NavLink>
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/settings' ? 'active' : ''
          }`}
        >
          <SettingsIcon className="nav-link-icon" />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? 'bg-gradient-to-r from-[#007EA7] to-[#00BF76] text-transparent bg-clip-text'
                : 'nav-link-text'
            }
          >
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NavMenu);
