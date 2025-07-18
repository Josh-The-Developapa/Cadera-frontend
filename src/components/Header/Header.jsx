import React from 'react';
import './Header.css';
import CaderaLogo from '../../assets/cadera-logo.png';
import HelpIcon from '../../assets/help.svg';
import SearchIcon from '../../assets/search-1.svg';

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <div className="search-bar">
          <input type="text" placeholder="I'm looking for..." />
          <img src={SearchIcon} alt="Search-Icon" className="search-icon" />
        </div>
      </div>
      <img src={HelpIcon} alt="Help-Icon" className="help-icon" />
    </div>
  );
}

export default React.memo(Header);
