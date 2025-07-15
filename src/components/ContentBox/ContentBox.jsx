import React from 'react';
import './ContentBox.css';

function ContentBox(props) {
  return (
    <div className="content-box">
      <p className="content-heading">{props.contentHeading}</p>
      {props.children}
    </div>
  );
}

export default ContentBox;
