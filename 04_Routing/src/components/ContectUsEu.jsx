import React from "react";

const ContectUsEu = () => {
  return (
    <div className="contact-region contact-india">
      <div className="region-icon" aria-hidden="true">
        🇪🇺
      </div>

      <span className="region-label">OUR EUROPE OFFICE</span>

      <h2>Welcome to Contact Us Europe</h2>

      <p className="region-description">
        Connect with our Europe team for assistance, business enquiries, and
        customer support. We are happy to help!
      </p>

      <div className="region-details">
        <div className="region-detail-item">
          <span className="detail-icon">📍</span>
          <div>
            <h3>Our Location</h3>
            <p>Europe</p>
          </div>
        </div>

        <div className="region-detail-item">
          <span className="detail-icon">✉️</span>
          <div>
            <h3>Email Support</h3>
            <p>Contact our support team for assistance.</p>
          </div>
        </div>

        <div className="region-detail-item">
          <span className="detail-icon">🕒</span>
          <div>
            <h3>Business Hours</h3>
            <p>Monday – Friday</p>
          </div>
        </div>
      </div>

      <div className="india-welcome">
        <span>✓</span>
        We are here to help you.
      </div>
    </div>
  );
};

export default ContectUsEu;
