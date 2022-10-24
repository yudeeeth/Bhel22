import React from 'react'
import './MimicScreen.css'
import Mimic from './Components/Mimic'
import useInterval from '../../util/UseInterval'

const MimicScreen = () => {
  const [sensorValues, setSensorValues] = React.useState([])
  const [sensorflags, setSensorflags] = React.useState([])
  // const [scale, setScale] = React.useState(1)
  useInterval(() => {
    fetch('/read',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q1: [200, 40],
        q2: [260, 40]
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
    })
  }, 1000)
  return (
    <div className='mimic-screen-main'>
      <Mimic leak={sensorflags} dbArray={sensorValues} scale={0.8}/>
      <div className='mimic-side-container'>
        <div className='mimic-side mimic-left-side'> Left Side</div>
        <div className='mimic-side mimic-right-side'> Right Side</div>
      </div>
      {/* <input type='range' min='0.5' max='1' step='0.01' onChange={(e)=>{setScale(e.target.value)}}></input> {scale} */}
    </div>
  )
}

export default MimicScreen