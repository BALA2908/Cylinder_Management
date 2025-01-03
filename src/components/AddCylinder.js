import React, { useState } from "react";
import axios from "axios";
import Popup from "./Popup";
import "./AddCylinder.css"; // Import the CSS file

const AddCylinder = () => {
  const [cylinder, setCylinder] = useState({
    type: "", // "FILL" or "NOT_FILL"
    status: "", // "DELIVERED" or "NOT_DELIVERED"
    refillDate: "",
  });
  const [popup, setPopup] = useState("");

  const handleChange = (e) => {
    setCylinder({ ...cylinder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the refillDate is in the correct format (ISO string)
    const formattedCylinder = {
      ...cylinder,
      refillDate: cylinder.refillDate ? new Date(cylinder.refillDate).toISOString() : "",
    };

    try {
      // POST request to the backend to add the cylinder data
      await axios.post("http://localhost:8080/cylinders", formattedCylinder);
      setPopup("Cylinder added successfully!");
      setCylinder({
        type: "",
        status: "",
        refillDate: "",
      });
    } catch (error) {
      console.error("Error adding cylinder:", error);
      setPopup("Failed to add cylinder. Please try again!");
    }
  };

  return (
    <div className="container">
      <h1>Add New Cylinder</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Cylinder Type</label>
          <div>
            <label>
              <input
                type="radio"
                name="type"
                value="Fill"
                checked={cylinder.type === "Fill"}
                onChange={handleChange}
              />
              Fill
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Empty"
                checked={cylinder.type === "Empty"}
                onChange={handleChange}
              />
              Empty
            </label>
          </div>
        </div>

        <div className="input-group">
          <label>Cylinder Status</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="Delivered"
                checked={cylinder.status === "Delivered"}
                onChange={handleChange}
              />
              Delivered
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Not Delivered"
                checked={cylinder.status === "Not Delivered"}
                onChange={handleChange}
              />
              Not Delivered
            </label>
          </div>
        </div>

        <input
          type="datetime-local"
          name="refillDate"
          value={cylinder.refillDate}
          onChange={handleChange}
          required
        />
        <button className="btn">Add Cylinder</button>
      </form>
      {popup && (
        <div className={`popup ${popup.includes("Failed") ? "error" : ""}`}>
          {popup}
        </div>
      )}
    </div>
  );
};

export default AddCylinder;
