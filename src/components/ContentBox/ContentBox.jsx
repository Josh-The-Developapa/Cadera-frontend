import React from 'react';
import './ContentBox.css';

function ContentBox(props) {
  return (
    <div className="content-box">
      <h1 className="content-heading">{props.contentHeading}</h1>
      {props.children}
    </div>
  );
}

export default ContentBox;
