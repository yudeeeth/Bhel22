import React from 'react'
import useInterval from '../../../util/UseInterval';
import SPItem from './SPItem';

const Disgnostics = () => {
    const bits = [12,3,5,6,8,11];
    const bitsName = ["Comm. fail","Cal. Req.","Cal. Error","Purge Req.","Purge Error","Self-Test Error"];
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
    <div className='sp-status sp-diag'>
        <div className='sp-diag-title'>Diagnostics</div>
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

export default Disgnostics