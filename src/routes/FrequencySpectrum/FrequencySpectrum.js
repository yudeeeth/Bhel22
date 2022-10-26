import React, {useState} from 'react'
import "./FrequencySpectrum.css"
import useInterval from '../../util/UseInterval'

import { Bar } from 'react-chartjs-2';

import * as ChartJs from 'chart.js';
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));
new ChartJs.Chart()


const FrequencySpectrum = () => {

    const [dB, setdB] = useState(0)
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
          dB:[11,1]

        }) 
      })
      .then(res => res.json())
      .then(data => {


        setdB(data.dB[0])
        setCurrentValue(data.bottom)
        setCurrentLimits(data.top)

        console.log(currentValue)
        console.log(currentLimits)


      })
    }, 1000)
    


    const options = {
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Horizontal Bar Chart',
        },
      },
      scales: {
        y: {
          min: 4000,
          max: 12000,
          grid: {
            display:false
          }
        },
        x: {
          grid:{
            display:false
          },
          
        }
      }
    };


    let labels = [];
    for(let i=1; i<=32; i++){
      labels.push(i*12000/32)
    }
    let input = {
      labels: labels,
      datasets: [
          {
              label: "currentValue",
              backgroundColor: "green",
              data: currentValue
          },
          {
              label: "newValue",
              backgroundColor: "red",
              data: currentLimits
          }
      ]
  };


    


  const currentSensor=2;
  return (
    <div className='FrequencySpectrum'> 
      <p className='Title'>Frequency Spectrum of the channel # {currentSensor}</p> 
      <p className='dbValue'>Current dB value : {dB} dB </p> 

      <p className='graphHeader'>FFT Set Points in DB</p>
      <div id="frequencyGraph">
      <Bar data={input} options={options}  />
      </div>
    </div>
  )
}

export default FrequencySpectrum