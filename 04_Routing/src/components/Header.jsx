import React from "react";
import Logo from "../assets/routemateLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={Logo} alt="RoutemateLogo" />
        <span>Routemate</span>
      </Link>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Product">Products</Link>
        <Link to="/Products">Product Details</Link>
      </nav>
    </header>
  );
};

export default Header;
