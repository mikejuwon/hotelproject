import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Homescreen />} />
          <Route exact path="/book/:roomid/:fromDate/:toDate" element={<Bookingscreen />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profilescreen />} />
          <Route exact path="/admin" element={<Adminscreen />} />
          <Route exact path="/" element={<Landingscreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
