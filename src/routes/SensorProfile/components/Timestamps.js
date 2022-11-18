import React from 'react'
import useInterval from '../../../util/UseInterval';
import { Buffer } from 'buffer';

const Timestamps = () => {
    function chunk(arr, chunkSize) {
        if (chunkSize <= 0) throw "Invalid chunk size";
        var R = [];
        for (var i=0,len=arr.length; i<len; i+=chunkSize)
          R.push(arr.slice(i,i+chunkSize));
        return R;
      }

    const bitsName = ["Uptime","Calibration","Last Purge","Last Error","Last Leak"]
    const remap=[4,1,0,2,3];
    const [vals,setVals] = React.useState([0,0,0,0,0]);
    const [cnts,setCnts] = React.useState([0,0,0,0,0]);
    useInterval(()=>{
        fetch('/read',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q1:[122,5],
                q2:[77,120-77]
            }) 
          })
          .then(res => res.json())
          .then(data => {
            setCnts(data.q1);
            let chnks = chunk(data.q2,9);
            chnks = chnks.map(e=>Buffer.from(e).toString('ascii'));
            console.log(chnks);
            setVals(chnks);
          })
    },1000)

  return (
    <div className='sp-status sp-time'>
        <div className='sp-t-item sp-time-tit'>
            <div>Timestamps</div>
            <div>Value</div>
            <div>Counts</div>
        </div>
        {
            bitsName.map((e,i)=>{
                return (
                    <div className='sp-t-item sp-time-it'>
                        <div>{bitsName[i]}</div>
                        <div>{vals[remap[i]]}</div>
                        <div>{cnts[remap[i]]}</div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Timestamps