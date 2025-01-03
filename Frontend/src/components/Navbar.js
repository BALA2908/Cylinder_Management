// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h3>Cylinder Management </h3>
        <input
          type="text"
          placeholder="Search Cylinders"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="navbar-right">
        <Link to="/add">
          <button className="btn add-btn">Add Cylinder</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
