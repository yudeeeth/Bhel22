import './App.css';
import Background from './routes/Home/Background';
import Home from './routes/Home/Home.js';
import RealtimeTrend from './routes/RealtimeTrend/RealtimeTrend';
import MimicScreen from './routes/MimicScreen/MimicScreen';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-main'>
      <Background >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mimicscreen" element={<MimicScreen />} />
          <Route path="/realtimetrend" element={<RealtimeTrend />} />
          {/* <Route path="/barGraph" element={<BarGraph />} />
          <Route path="/frequencySpectrum" element={<FrequencySpectrum />} />
          <Route path="/sensorProfile" element={<SensorProfile />} />
          <Route path="/sensorSettings" element={<SensorSettings />} />
          <Route path="/systemSettings" element={<SystemSettings />} />
          <Route path="/sensorStatus" element={<SensorStatus />} />
        <Route path="/help" element={<Help />} /> */}
        </Routes>
      </Background>
    </div>
  );
}

export default App;
