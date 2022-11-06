import './App.css';
import Background from './routes/Background/Background';
import Home from './routes/Home/Home.js';
import RealtimeTrend from './routes/RealtimeTrend/RealtimeTrend';
import BarGraphScreen from './routes/BarGraph/BarGraphScreen'
import MimicScreen from './routes/MimicScreen/MimicScreen';
import FrequencySpectrum from './routes/FrequencySpectrum/FrequencySpectrum'
import SensorStatus from './routes/SensorStatus/SensorStatus'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-main'>
      <Background >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mimicscreen" element={<MimicScreen />} />
          <Route path="/realtimetrend" element={<RealtimeTrend />} />
          <Route path="/bargraph" element={<BarGraphScreen />} />
          <Route path="/frequencyspectrum" element={<FrequencySpectrum />} />
          <Route path="/statussummary" element={<SensorStatus />} />
          {/* 
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
