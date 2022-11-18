import React from 'react'

const SPItem = (props) => {
  return (
    <div className='sp-item'>
    <div className='sp-value' style={props.style}></div>
    <div className='sp-name'>{props.name}</div>
</div>
  )
}

export default SPItem