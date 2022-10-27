import React from 'react'

const MoveLeftRight = (props) => {
  return (
    <div className='left-right-main'>
      <button className='btn-metal' onClick={(e)=>{props.setOffset(e=>e+1)}}>{'<- Left'}</button>
      <button className='btn-metal' onClick={(e)=>{props.setOffset(e=>{if(e!=0) return e-1; return 0;})}}>{'Right ->'}</button>
    </div>
  )
}

export default MoveLeftRight