import React from 'react';
import './LoggedOutHeader.css';
import CaderaLogo from '../../assets/cadera-logo.png';
import HelpIcon from '../../assets/help.svg';
import SearchIcon from '../../assets/search-1.svg';

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img src={CaderaLogo} alt="Cadera-Logo" className="header-logo" />
      </div>
      <img src={HelpIcon} alt="Help-Icon" className="help-icon" />
    </div>
  );
}

export default React.memo(Header);
