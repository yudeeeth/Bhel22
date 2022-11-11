import React, {useState} from 'react'
import "./FrequencySpectrum.css"
import useInterval from '../../util/UseInterval'
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import ChangeSensor from '../Change-sensor/Change-sensor';
import { getParseTreeNode } from 'typescript';

const FrequencySpectrum = () => {

    const [dB, setdB] = useState(0)
    const [currentChannel,setCurrentChannel] = useState(1);
    const [currentValue , setCurrentValue] = useState([])
    const [currentLimits, setCurrentLimits ] = useState([])

    useInterval(() => {
      fetch('/read',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          top: [14, 32],
          bottom: [146, 32],
          dB:[101,1],
          channel:[9,1]
        }) 
      })
      .then(res => res.json())
      .then(data => {

        setCurrentChannel(data.channel[0])
        setdB(data.dB[0])
        setCurrentValue(data.bottom.map(a=>a%120))
        setCurrentLimits(data.top.map(a=>120-(a%20)))

      })
    }, 1000)
    


    const options = {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 120,
          grid: {
            display:false
          }
        },
        x: {
          grid:{
            display:false
          },
          stacked:true
          
        }
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Horizontal Bar Chart',
        },
      }
    };


    let labels = [];
    for(let i=1; i<=32; i++){
     
      let a = i*12000/32
      if(a%1500==0)
        labels.push(a)
      else
        labels.push('')
    }
    labels.push('Hz')
    let input = {
      labels: labels,
      datasets: [
          {
              label: "current dB",
              backgroundColor: currentValue.map((val,ind)=>{if(val<currentLimits[ind]) return "green"; else return "red"}),
              data: currentValue
          },
          {
              label: "FFT alarm points",
              backgroundColor: "gray",
              data: currentLimits
          },
          {
            label: "FFT danger",
            backgroundColor: "red",
            data: currentLimits.map(_=>140)
          }
      ]
  };
  return (
    <div className='FrequencySpectrum'> 
    <div className='freq-title-container'>
      <p className='Title'>Frequency Spectrum of the channel # {currentChannel + 1}</p> 
    <ChangeSensor start={currentChannel + 1}/>

    </div>
      <p className='dbValue'>Current dB value : {dB} dB </p> 

      <p className='graphHeader'>FFT Set Points in DB</p>
      <div id="frequencyGraph">
      <Bar data={input} options={options}  />
      </div>
    </div>
  )
}

export default FrequencySpectrum