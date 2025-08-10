import React, { useState, useEffect, useContext } from 'react';
import './NavMenu.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SchoolLogo from '../../assets/makarios.png';
import CaderaLogo from '../../assets/cadera-logo.png';
import Collapsed from '../../assets/collapsed.png';
import {
  LayoutDashboard as OverViewIcon,
  Settings as SettingsIcon,
  BookOpen as GradesIcon,
  FileText as ReportsIcon,
  ChartPie as AnalyticsIcon,
  Users,
  PanelLeftClose,
} from 'lucide-react';
import Context from '../../Context/Context';

function NavMenu() {
  const context = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (!context.isExpanded) {
      context.setIsExpanded(true);
    } else {
      navigate('/admin/students');
    }
  };

  const toggleNavMenu = () => {
    context.setIsExpanded(!context.isExpanded);
  };

  return (
    <div
      className={`nav-menu ${context.isExpanded ? 'expanded' : 'collapsed'}`}
    >
      <NavLink to="/">
        <img
          src={SchoolLogo}
          alt={'Cadera-Logo'}
          className="header-logo"
          style={{
            marginBottom: '30px',
            width: '32px',
            height: '32px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </NavLink>

      <div className="nav-link-container">
        {/* Overview */}
        <div
          className={`nav-link-div ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          <NavLink to="/" className="nav-icon-link">
            <OverViewIcon
              className="nav-link-icon"
              stroke={location.pathname === '/' ? '#C16CE2' : '#737373'}
            />
          </NavLink>
          {context.isExpanded && (
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
            >
              Overview
            </NavLink>
          )}
        </div>

        {/* Admin */}
        <div
          className={`nav-link-div ${
            location.pathname.startsWith('/admin') ? 'active' : ''
          }`}
          style={{ cursor: 'pointer' }}
          onClick={handleAdminClick}
        >
          <div onClick={handleAdminClick} className="nav-icon-link">
            <Users
              className="nav-link-icon"
              stroke={
                location.pathname === '/admin/students' ||
                location.pathname === '/admin/teachers' ||
                location.pathname === '/admin/classes'
                  ? '#C16CE2'
                  : '#737373'
              }
            />
          </div>
          {context.isExpanded && (
            <span
              className={
                location.pathname.startsWith('/admin')
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
              onClick={handleAdminClick}
            >
              Admin
            </span>
          )}
        </div>

        {/* Submenu for Admin - only show when expanded */}
        {context.isExpanded && (
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
            location.pathname.startsWith('/grades') ? 'active' : ''
          }`}
        >
          <NavLink to="/grades" className="nav-icon-link">
            <GradesIcon
              className="nav-link-icon"
              stroke={
                location.pathname.startsWith('/grades') ? '#C16CE2' : '#737373'
              }
            />
          </NavLink>
          {context.isExpanded && (
            <NavLink
              to="/grades"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
            >
              Grades
            </NavLink>
          )}
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/reports' ? 'active' : ''
          }`}
        >
          <NavLink to="/reports" className="nav-icon-link">
            <ReportsIcon
              className="nav-link-icon"
              stroke={location.pathname === '/reports' ? '#C16CE2' : '#737373'}
            />
          </NavLink>
          {context.isExpanded && (
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
            >
              Reports
            </NavLink>
          )}
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/analytics' ||
            location.pathname === '/analytics/classes'
              ? 'active'
              : ''
          }`}
        >
          <NavLink to="/analytics" className="nav-icon-link">
            <AnalyticsIcon
              className="nav-link-icon"
              stroke={
                location.pathname.startsWith('/analytics')
                  ? '#C16CE2'
                  : '#737373'
              }
            />
          </NavLink>
          {context.isExpanded && (
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
            >
              Analytics
            </NavLink>
          )}
        </div>

        <div
          className={`nav-link-div ${
            location.pathname === '/settings' ? 'active' : ''
          }`}
        >
          <NavLink to="/settings" className="nav-icon-link">
            <SettingsIcon
              className="nav-link-icon"
              stroke={location.pathname === '/settings' ? '#C16CE2' : '#737373'}
            />
          </NavLink>
          {context.isExpanded && (
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                  : 'nav-link-text'
              }
            >
              Settings
            </NavLink>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="nav-toggle-container">
        <NavLink to="/">
          <img
            src={context.isExpanded ? CaderaLogo : Collapsed}
            alt={context.isExpanded ? 'Cadera-Logo' : 'Collapsed-Logo'}
            className="header-logo"
            style={{
              width: 'auto',
              height: '16px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              marginBottom: '0px',
              paddingLeft: '15px',
            }}
          />
        </NavLink>
        <button className="nav-toggle-btn" onClick={toggleNavMenu}>
          <PanelLeftClose
            className={`nav-toggle-icon ${context.isExpanded ? '' : 'rotated'}`}
            stroke="#737373"
          />
        </button>
      </div>
    </div>
  );
}

export default React.memo(NavMenu);
