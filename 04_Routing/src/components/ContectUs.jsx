import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ContectUs = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Choose your region to contact our team.</p>

      <nav className="contact-nav">
        <Link to="in">India</Link>
        <Link to="us">USA</Link>
        <Link to="eu">Europe</Link>
      </nav>

      <div className="contact-content">
        <Outlet />
      </div>

      <button type="button" className="BackButton" onClick={handleBack}>
        Back to Home Page
      </button>
    </div>
  );
};

export default ContectUs;
