import React from 'react'

const Gauge = (props) => {
  return (
    <div className='lg'>
        Temperature {props.val} deg. C
        <div className='lg-line'>
            <div className='lg-val' style={{width:`${props.percent}%`}}></div>
        </div>
    </div>
  )
}

export default Gauge