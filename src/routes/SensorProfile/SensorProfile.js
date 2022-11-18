import React from 'react'
import { Link } from 'react-router-dom'
import Mimic from '../MimicScreen/Components/Mimic'
import './SensorProfile.css'
import Status from './components/Status'
import useInterval from '../../util/UseInterval'
import Disgnostics from './components/Disgnostics'
import TimeStamps from './components/Timestamps'
import Button3d from './../../util/Button3d'
import SensorDetails from './components/SensorDetails'
import SensorGraphics from './components/SensorGraphics'
import ChangeSensor from './../Change-sensor/Change-sensor'

const SensorProfile = () => {
  const [sensorValues, setSensorValues] = React.useState([])
  const [sensorflags, setSensorflags] = React.useState([])
  const [currentSens, setCurrentSens] = React.useState(1);
  useInterval(() => {
    fetch('/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q1: [200, 40],
        q2: [260, 40],
        db: [9, 1]
      })
    })
      .then(res => res.json())
      .then(data => {
        setSensorValues(data.q1.map(e => 40 + e % 81));
        let flags = [];
        for (let i = 0; i < data.q2.length; i++) {
          if ((data.q2[i] & 1) === 1) {
            flags.push(i + 1);
          }
        }
        setSensorflags(flags);
        setCurrentSens(data.db);
      })
  }, 1000)

  return (
    <div className='sensor-profile-main'>
      <div className='sensor-p-top'>
        <Mimic leak={sensorflags} dbArray={sensorValues} scale={0.5} />
        {currentSens && <SensorDetails />}
        <div>
          <ChangeSensor start={currentSens} callback={setCurrentSens} />
          <SensorGraphics />
        </div>
      </div>
      <div className='sensor-p-bottom'>
        <div className='sensor-p-b-s1'>
          <Link to='/sensorsettings'><Button3d style>Sensor Settings</Button3d></Link>
          <TimeStamps />
        </div>
        <Disgnostics />
        <Status />
      </div>
    </div>
  )
}

export default SensorProfile