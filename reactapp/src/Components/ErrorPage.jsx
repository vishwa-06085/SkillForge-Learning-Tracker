import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <>
      <h1 className="error-label">Error Screen:</h1>
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-title">Something Went Wrong</h1>
          <p className="error-message">We're sorry, but an error occurred. Please try again later.</p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;