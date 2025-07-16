import React from 'react';
import './Error.css';
import LoggedOutHeader from '../../components/LoggedOutHeader/LoggedOutHeader';
import ErrorIcon from '../../assets/error.png';

function Error() {
  return (
    <div className="error-container">
      <LoggedOutHeader />
      <div className="error-modal">
        <img src={ErrorIcon} alt="Error-Icon" className="error-icon" />
        <h1 className="login-heading">Error</h1>
        <p className="error-paragraph">
          Your device doesn't meet the requirements to run Cadera. Please
          contact your administrator for support.
        </p>
      </div>
    </div>
  );
}

export default Error;
