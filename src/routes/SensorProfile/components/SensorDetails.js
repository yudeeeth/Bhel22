import React from 'react'
import useInterval from '../../../util/UseInterval';
import SPItem from './SPItem';
import { Buffer } from 'buffer';

const SensorDetails = () => {

    const bitsName = ["SensorId", "Sensor No", "Sensor Type", "Firmware version"]
    const remap = [3, 0, 1, 2];
    const [vals, setVals] = React.useState([0, 0, 0, 0]);
    const [chno, setchno] = React.useState(0)
    const [loc, setloc] = React.useState(0);
    const [db, setdb] = React.useState(0);
    const [temp, settemp] = React.useState(0);
    useInterval(() => {
        fetch('/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelNo: [9, 1],
                sensordets: [70, 4],
                location: [74, 3],
                currentDb: [11, 1],
                temp: [10, 1]
            })
        })
            .then(res => res.json())
            .then(data => {
                setVals(data.sensordets);
                setchno(data.channelNo);
                setloc(data.location);
                setdb(data.currentDb);
                settemp(data.temp);
            })
    }, 1000)

    const pad=(mess)=>{
        return mess.toString().padStart(6,'⠀');
    }

    return (
        <div className='sp-status sp-dets'>
            <div className='sp-t-item'>
                <div>Sensor Details  Ch# {chno}</div>
            </div>
            {
                bitsName.map((e, i) => {
                    return (
                        <div className='sp-t-item'>
                            <div>
                                {bitsName[i]}
                            </div>
                            <div className='sp-vals'>
                               : {pad(vals[remap[i]])}
                            </div>
                        </div>
                    )
                })
            }
            <div className='sp-t-item'>
                <div>
                    Current dB 
                </div>
                <div className='sp-vals'>
                   : {pad(db)}
                </div>
            </div>
            <div className='sp-t-item'>
                <div>
                    Location
                </div>
                <div className='sp-location sp-vals'> : 
                   <span>{loc[0]}</span>
                   <span>{loc[1]}</span>
                   <span>{loc[2]}</span>
                </div>
            </div>
        </div>
    )
}

export default SensorDetails