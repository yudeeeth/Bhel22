import React from 'react'
import useInterval from '../../../util/UseInterval';
import './SensorDot.css'

const SensorDot = (props) => {
    const [hideHint,setHideHint] = React.useState(true);
    const [red,setRed] = React.useState(false);
    useInterval(()=>{
        if(props.leak){
            setRed(i=>!i);
        }
    },500);

    return (
        <div className='sensor-dots' 
        id={props.index} 
        style={{ top: `${props.coord[1]}px`, left: `${props.coord[0]}px` }} 
        onChange={(e) => { props.changeCoord(e); }}
        onMouseLeave={()=>{setHideHint(true)}} 
        onMouseEnter={(e)=>{ if(['sensor-dots','sensor-dots-inner'].includes(e.target.className)) setHideHint(false);}}
        onMouseMove={(e)=>{ if(['sensor-dots','sensor-dots-inner'].includes(e.target.className)) setHideHint(false);}}
        > 
            <div className='sensor-dots-inner' blink={red.toString()}>
                {parseInt(props.index) + 1}
                <div className='sensor-dots-hint'  hidden={hideHint}>
                    Location: 
                    <br /> {props.location}
                </div>
                <div className='sensor-dots-DB' >
                    {props.db}dB
                </div>
            </div>
        </div>
    )
}

export default SensorDot