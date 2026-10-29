import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} <span>Routemate</span>. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
