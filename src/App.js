import './App.css';
import Home from './routes/Home.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/barGraph" element={<BarGraph />} />
        <Route path="/frequencySpectrum" element={<FrequencySpectrum />} />
        <Route path="/realtimeTrend" element={<RealtimeTrend />} />
        <Route path="/mimicScreen" element={<MimicScreen />} />
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
