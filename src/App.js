// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddCylinder from "./components/AddCylinder";
import EditCylinder from "./components/EditCylinder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddCylinder />} />
        <Route path="/edit/:id" element={<EditCylinder />} />
      </Routes>
    </Router>
  );
};

export default App;
