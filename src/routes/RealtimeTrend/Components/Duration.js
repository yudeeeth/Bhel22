import React from 'react'
import Button3d from '../../../util/Button3d';

const Duration = (props) => {
  return (
    <div className='duration-main'>
      <Button3d className='duration-button' onClick={(e)=>{ props.setOffset(0); props.setTimescale('sec')}}>Time Duration <br/> 1 sec</Button3d>
      <Button3d className='duration-button' onClick={(e)=>{ props.setOffset(0); props.setTimescale('min')}}>Time Duration <br/> 1 min</Button3d>
      <Button3d className='duration-button' onClick={(e)=>{ props.setOffset(0); props.setTimescale('10min')}}>Time Duration <br/> 10 min</Button3d>
      <Button3d className='duration-button' onClick={(e)=>{ props.setOffset(0); props.setTimescale('hour')}}>Time Duration <br/> 1 hour</Button3d>
      <Button3d className='duration-button' onClick={(e)=>{ props.setOffset(0); props.setTimescale('day')}}>Time Duration <br/> 1 day</Button3d>
    </div>
  )
}

export default Duration