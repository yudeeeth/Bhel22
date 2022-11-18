import React from 'react'
import Button3d from '../../../util/Button3d'
import GaugeChart from 'react-gauge-chart'
import Gauge from './Gauge'
import useInterval from '../../../util/UseInterval'

const SensorGraphics = () => {
    const bits = [10,7,13];
    const [db,setDb] = React.useState(0);
    const [temp,setTemp] = React.useState(0);
    const [status,setStatus] = React.useState(0);
    useInterval(()=>{
        fetch('/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                db:[80,1],
                temp:[70,1],
                status:[70,1]
            })
        })
            .then(res => res.json())
            .then(data => {
                setDb(data.db[0]);
                setTemp(data.temp[0]);
                setStatus(data.status[0]);
            })
    },1000)

    const settests = (s)=>{
        fetch('/set',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              q1: [13,s],
            }) 
          })
    }

  return (
    <div className='sp-gr'>
        <div className='sp-gr-left'>
            <GaugeChart nrOfLevels={12} animate={false} formatTextValue={(val)=>((val*1.2).toString().slice(0,4)+"dB")} percent={db/120} style={{height:'125px'}}/>
            <Gauge percent={temp/120*100} val={temp} />
        </div>
        <div className='sp-gr-right'>
            <div className='sp-gr-row'><Button3d onClick={()=>{settests(0)}}> Self Test </Button3d> <div className="sp-value " style={((status>>1)&1==1)?{backgroundColor:'red'}:{}}></div> </div>
            <div className='sp-gr-row'><Button3d onClick={()=>{settests(1)}}> Purge </Button3d> <div className="sp-value " style={(status>>3&1==1)?{backgroundColor:'red'}:{}}></div> </div>
            <div className='sp-gr-row'><Button3d onClick={()=>{settests(4)}}> Listen </Button3d> <div className="sp-value" style={(status>>5&1==1)?{backgroundColor:'red'}:{}}></div> </div>
        </div>
    </div>
  )
}

export default SensorGraphics