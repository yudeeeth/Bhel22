import React from 'react'
import useInterval from '../../../util/UseInterval';
import SPItem from './SPItem';

const Status = () => {
    const bits = [0,1,4,7,10];
    const bitsName = ["Healthiness","Leak Detected","Calibrating",'Purging',"Selftest Progress"]
    const [value,setValue] = React.useState(0);
    useInterval(()=>{
        fetch('/read',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              q1: [78, 1]
            }) 
          })
          .then(res => res.json())
          .then(data => {
            setValue(data.q1[0]);
          })
    },1000)

  return (
    <div className='sp-status'>
        <div className='sp-title'>Status</div>
        {
            bits.map((e,i)=>{
                return (
                    <SPItem name={bitsName[i]} style={(value>>bits[i]&1)==1? {background:'red'}:{}}/>

                )
            })
        }
    </div>
  )
}

export default Status