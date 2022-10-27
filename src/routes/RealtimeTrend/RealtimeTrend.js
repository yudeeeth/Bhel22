import React, { useEffect } from 'react'
import Duration from './Components/Duration'
import Legend from './Components/Legend'
import MoveLeftRight from './Components/MoveLeftRight'
import RealtimeGraph from './Components/RealtimeGraph'
import useInterval from '../../util/UseInterval'
import './RealtimeTrend.css'
import bg from '../../util/104287-white-stripes-pattern.jpg'
import ChangeChannel from './Components/ChangeChannel'

const RealtimeTrend = () => {
    // const [duration, setDuration] = React.useState(0);
    const [currentChannels,setCurrentChannels] = React.useState(3);
    const [values, setValues] = React.useState([]);
    const [lastTimestamp, setLastTimestamp] = React.useState(null);
    const [timescale,setTimescale] = React.useState('sec');
    const [offset,setOffset] = React.useState(0);
    const [currentValue,setCurrentValue] = React.useState([]);
    const timecaleOpts = {
        "sec": 1,
        "min": 60,
        "10min": 600,
        "hour":3600,
        "day": 3600*24,
    }
    const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(200, 159, 64, 0.8)',
        'rgba(255, 200, 132, 0.8)',
        'rgba(200, 162, 235, 0.8)', 
        'rgba(255, 206, 86, 0.8)',
        'rgba(56, 192, 192, 0.8)',
      ];

    useEffect(()=>{
        async function suddenfetch(){
            let data = await fetch('/realtime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({timestamp: lastTimestamp})
            });
            data = await data.json();
            setLastTimestamp(data.latest);
            setValues(v=>[...v,...data.values]);
        }
        suddenfetch();
    },[timescale])

    useInterval(async () => {
        let data = await fetch('/realtime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({timestamp: lastTimestamp})
        });
        data = await data.json();
        setLastTimestamp(data.latest);
        setValues(v=>[...v,...data.values]);
    },timecaleOpts[timescale]*1000);
    useInterval(async () => {
        let data = await fetch('/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({q1:[260,40]})
        });
        data = await data.json();
        setCurrentValue(data.q1);
    },1000);

    let transform = (array, samples, offset,timescale)=>{
        let k = array.length-1-offset*timecaleOpts[timescale];
        let ret = [];
        for(let i=0;i<samples;i++){
            if(k<0) break;
            ret.push(array[k]);
            k-=timecaleOpts[timescale];
        }
        return ret.reverse();
    }

    return (
        <div className='realtime-main-container' >
            {/* style={{backgroundImage:`url(${bg})`,backgroundSize:'1000px'}} */}
            <ChangeChannel setCurrentChannels={setCurrentChannels} currentChannels={currentChannels}/>
            <div className='realtime-horizontal-container'>
                <Legend colors={colors} offset={0} currentChannels={currentChannels} currentValues={currentValue}/>
                { values.length!=0 && <RealtimeGraph colors={colors} values={transform(values,10,offset,timescale)} currentChannels={currentChannels}/>}
                <Legend colors={colors} offset={1} currentChannels={currentChannels} currentValues={currentValue}/>
            </div>
            <MoveLeftRight setOffset={setOffset}/>
            <Duration setTimescale={setTimescale} setOffset={setOffset}/>
        </div>
    )
}

export default RealtimeTrend