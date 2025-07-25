import React, { useContext } from 'react';
import './ContentBox.css';
import Context from '../../Context/Context';
import { motion } from 'framer-motion';

function ContentBox(props) {
  const context = useContext(Context);

  return (
    <div className="content-box">
      <motion.div
        className="content-box"
        initial={false} // ✅ disables animation on first render
        animate={{
          paddingLeft: context.isExpanded ? '202px' : '102px',
          paddingTop: '90px',
        }}
        transition={{
          duration: 0.32,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <p className="content-heading">{props.contentHeading}</p>
        {props.children}
      </motion.div>
    </div>
  );
}

export default ContentBox;
