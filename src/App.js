import './App.css';
import React from 'react';
import Background from './routes/Background/Background';
import Home from './routes/Home/Home.js';
import RealtimeTrend from './routes/RealtimeTrend/RealtimeTrend';
import BarGraphScreen from './routes/BarGraph/BarGraphScreen'
import MimicScreen from './routes/MimicScreen/MimicScreen';
import FrequencySpectrum from './routes/FrequencySpectrum/FrequencySpectrum'
import SensorStatus from './routes/SensorStatus/SensorStatus'
import SensorSettings from './routes/SensorSettings/SensorSettings';
import { Routes, Route } from 'react-router-dom';
import SystemSettings from './routes/SystemSettings/SystemSettings';
import Secure from './routes/Secure/secure';
import Help from './routes/Help/help';

function App() {
  return (
    <div className='app-main'>
      <Background>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mimicscreen" element={<MimicScreen />} />
          <Route path="/realtimetrend" element={<RealtimeTrend />} />
          <Route path="/bargraph" element={<BarGraphScreen />} />
          <Route path="/frequencyspectrum" element={<FrequencySpectrum />} />
          <Route path="/statussummary" element={<SensorStatus />} />
          <Route path="/systemSettings" element={
          <Secure>
            <SystemSettings />
          </Secure> 
          } />
          <Route path="/sensorstatus" element={<SensorStatus />} />
          <Route path="/sensorsettings" element={<Secure> <SensorSettings /> </Secure>} />
          <Route path="/help" element={<Help />} /> 
          <Route path="/sensorProfile" element={<Secure> <SensorSettings /> </Secure>} /> 
          {/* 
          */}
        </Routes>
      </Background>
    </div>
  );
}

export default App;
