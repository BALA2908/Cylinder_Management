import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Ensure this is imported
import Popup from "./Popup"; // Ensure Popup is correctly imported

const EditCylinder = () => {
  const { id } = useParams(); // Extract `id` from URL params
  const [cylinder, setCylinder] = useState({
    id: "", // Adding id field
    type: "",
    status: "",
    refillDate: ""
  });
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetchCylinder();
  }, [id]); // Ensure that the `id` dependency is added so that `fetchCylinder` is called every time `id` changes

  const fetchCylinder = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cylinders/${id}`);
      setCylinder(response.data);
    } catch (error) {
      console.error("Error fetching cylinder:", error);
      setPopup("Failed to fetch cylinder.");
    }
  };

  const handleChange = (e) => {
    setCylinder({ ...cylinder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure that the `id` is passed correctly
      const response = await axios.put(`http://localhost:8080/cylinders/${id}`, cylinder);
      setPopup("Cylinder updated successfully!");
    } catch (error) {
      console.error("Error updating cylinder:", error);
      setPopup("Failed to update cylinder.");
    }
  };

  return (
    <div className="container">
      <h1>Edit Cylinder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Cylinder ID"
          value={cylinder.id}
          disabled
          required
        />

        {/* Radio buttons for Cylinder Type */}
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

        {/* Radio buttons for Cylinder Status */}
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

        {/* Date-time input for refill date */}
        <div className="input-group">
          <label>Refill Date</label>
          <input
            type="datetime-local"
            name="refillDate"
            value={cylinder.refillDate || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn">Update Cylinder</button>
      </form>

      {/* Popup for showing success or error messages */}
      {popup && <Popup message={popup} onClose={() => setPopup("")} />}
    </div>
  );
};

export default EditCylinder;
