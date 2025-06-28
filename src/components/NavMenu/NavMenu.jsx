import React, { useState } from 'react';
import './NavMenu.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CaderaLogo from '../../assets/cadera-logo.png';

import OverViewIcon from '../../assets/dashboard-3--app-application-dashboard-home-layout-vertical.svg';
import AdminIcon from '../../assets/user-multiple-group--close-geometric-human-multiple-person-up-user.svg';
import GradesIcon from '../../assets/open-book--content-books-book-open.svg';
import ReportsIcon from '../../assets/new-file--empty-common-file-content.svg';
import AnalyticsIcon from '../../assets/pie-chart-2.svg';
import SettingsIcon from '../../assets/cog--work-loading-cog-gear-settings-machine.svg';

function NavMenu() {
  const location = useLocation();

  const [adminOpen, setAdminOpen] = useState(true);

  const handleAdminClick = () => {
    setAdminOpen((prev) => !prev);
    if (!location.pathname.startsWith('/admin')) {
      navigate('/admin/students');
    }
  };

  return (
    <div className="nav-menu">
      <img
        src={CaderaLogo}
        alt="Cadera-Logo"
        className="header-logo"
        style={{ marginBottom: '50px' }}
      />
      <div className="nav-link-container">
        {/* Overview */}
        <div
          className={`nav-link-div ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          <img src={OverViewIcon} alt="Overview" className="nav-link-icon" />
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
          onClick={handleAdminClick}
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
        {adminOpen && (
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
        )}

        {/* Other Menu Items */}
        <div
          className={`nav-link-div ${
            location.pathname === '/grades' ? 'active' : ''
          }`}
        >
          <img src={GradesIcon} alt="Grades" className="nav-link-icon" />
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
          <img src={ReportsIcon} alt="Reports" className="nav-link-icon" />
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
          <img src={AnalyticsIcon} alt="Analytics" className="nav-link-icon" />
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
          <img src={SettingsIcon} alt="Settings" className="nav-link-icon" />
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
