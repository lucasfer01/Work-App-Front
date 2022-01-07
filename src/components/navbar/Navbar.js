import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/Home" className="nav-item nav-link active">
            Home <span className="sr-only">(current)</span>
          </Link>
          <Link to="/Features" className="nav-item nav-link">
            Features
          </Link>
          <Link to="/Pricing" className="nav-item nav-link">
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
};
