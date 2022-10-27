import "./App.css";
import React, { Component } from "react";
import Home from "./routes/Home.js";
import MimicScreen from "./routes/MimicScreen/MimicScreen";
import BarGraphScreen from "./routes/BarGraph/BarGraphScreen";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mimicScreen" element={<MimicScreen />} />
        <Route path="/barGraph" element={<BarGraphScreen />} />
        {/* <Route path="/frequencySpectrum" element={<FrequencySpectrum />} />
        <Route path="/realtimeTrend" element={<RealtimeTrend />} />
        <Route path="/sensorProfile" element={<SensorProfile />} />
        <Route path="/sensorSettings" element={<SensorSettings />} />
        <Route path="/systemSettings" element={<SystemSettings />} />
        <Route path="/sensorStatus" element={<SensorStatus />} />
        <Route path="/help" element={<Help />} /> */}
      </Routes>
    </div>
  );
}

export default App;
