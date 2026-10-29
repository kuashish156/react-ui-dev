import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="error-code">404</div>

      <div className="error-icon">🔍</div>

      <h1>Page Not Found</h1>

      <p>
        The page you are looking for does not exist. It may have been moved or
        the URL may be incorrect.
      </p>

      <Link to="/" className="error-home-button">
        <span>←</span> Back to Home
      </Link>

      <span className="error-footer">Error 404 · Page unavailable</span>
    </div>
  );
};

export default PageNotFound;
