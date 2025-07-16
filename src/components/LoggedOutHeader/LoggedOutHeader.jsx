import React from 'react';
import './LoggedOutHeader.css';
import CaderaLogo from '../../assets/cadera-logo.png';
import HelpIcon from '../../assets/help.svg';
import SearchIcon from '../../assets/search-1.svg';

function LoggedOutHeader() {
  return (
    <div className="logged-out-header">
      <div className="logged-out-header-left">
        <img
          src={CaderaLogo}
          alt="Cadera-Logo"
          className="logged-out-header-logo"
        />
      </div>
      <img
        src={HelpIcon}
        alt="Help-Icon"
        className="logged-out-header-help-icon"
      />
    </div>
  );
}

export default React.memo(LoggedOutHeader);
