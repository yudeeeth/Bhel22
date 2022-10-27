import React from 'react'
import './Button3d.css'


const Button3d = (props) => {
  return (
    <div className="button3d-container">
        <button className="button3d green loading-button3d" onClick={props.onClick}>{props.children}</button> 
    </div>
  )
}

export default Button3d;