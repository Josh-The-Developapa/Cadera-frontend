import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import HelpIcon from '../../assets/help.svg';
import SearchIcon from '../../assets/search-1.svg';
import Context from '../../Context/Context';

function Header() {
  const context = useContext(Context);

  return (
    <motion.div
      className="header"
      animate={{ left: context.isExpanded ? 170 : 70 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="header-left">
        <div className="search-bar">
          <input type="text" placeholder="I'm looking for..." />
          <img src={SearchIcon} alt="Search-Icon" className="search-icon" />
        </div>
      </div>
      <img src={HelpIcon} alt="Help-Icon" className="help-icon" />
    </motion.div>
  );
}

export default React.memo(Header);
