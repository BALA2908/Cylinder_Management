import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Navbar from "./Navbar"; // Import Navbar
import './HomePage.css'; // Make sure you have this CSS file for styling

const HomePage = () => {
  const [cylinders, setCylinders] = useState([]);
  const [popup, setPopup] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    fetchCylinders();
  }, []);

  const fetchCylinders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cylinders");
      console.log(response.data); // Log the response to check the data
      setCylinders(response.data);
    } catch (error) {
      console.error("Error fetching cylinders:", error);
    }
  };
  

  const deleteCylinder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cylinders/${id}`);
      setPopup("Cylinder deleted successfully!");
      fetchCylinders(); // Refresh cylinder list after deletion
    } catch (error) {
      console.error("Error deleting cylinder:", error);
      setPopup("Failed to delete cylinder. Please try again!");
    }
  };

  // Filter cylinders based on the search query
  const filteredCylinders = cylinders.filter((cylinder) => {
    return (
      cylinder.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      cylinder.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cylinder.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="page-container">
      <div className="main-content">
        {/* Navbar inside the main content */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Add Navbar component */}
        
        <div className="content">
        
          {/* Sidebar on the left */}
          <div className="sidebar">
            <h3 className="f">Fuel Agency</h3>
            <ul>
              <li><Link to="/customer-management">Customer Management</Link></li>
              <li><Link to="/cylinder-management">Cylinder Management</Link></li>
              <li><Link to="/supplier-management">Supplier Management</Link></li>
              <li><Link to="/customer-booking">Customer Booking</Link></li>
              <li><Link to="/report-management">Report Management</Link></li>
            </ul>
          </div>

          {/* Cylinder List */}
          <div className="cylinder-list">
            {filteredCylinders.map((cylinder) => (
              <div key={cylinder.id} className="cylinder-item">
                <h3>{cylinder.id}</h3> {/* Display ID instead of name */}
                <p>Type: {cylinder.type}</p>
                <p>Status: {cylinder.status}</p>
                <button
                  className="btn edit-btn"
                  onClick={() => (window.location.href = `/edit/${cylinder.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteCylinder(cylinder.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {popup && <Popup message={popup} onClose={() => setPopup("")} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
