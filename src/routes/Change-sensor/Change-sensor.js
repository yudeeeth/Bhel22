import React, { useEffect } from 'react'
import './Change-sensor.css'

const ChangeSensor = (props) => {
    const [regValue, setRegValue] = React.useState(props.start ?? 1);
    const inpref = React.useRef(null);

    useEffect(()=>{
        changeSensor(regValue);
    })

    const isLegal=(n)=>{
        return n>=1 && n<=40;
    }

    const changeSensor = (regValue) => {
        if(isLegal(regValue)){
            fetch("/write", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    q1: [9, [regValue]],
                })
            }).then(_=>{if(props.callback) {props.callback(regValue)}});
        }
    }

    const changeVal = (e) =>{
        if(e=="+"){
            if(regValue>=40) setRegValue(1);
            else setRegValue(e=>parseInt(e)+1);
        }
        else{
            if(regValue<=1) setRegValue(40);
            else setRegValue(e=>parseInt(e)-1);
        }
        changeSensor(regValue);
    }

    const onPressEnter = (e)=>{
        if(e.key=="Enter"){
            if(isLegal(inpref.current.value))
                changeSensor(regValue);
            else{
                changeSensor(1);
            }
        }
    }

    return (
    
        <div className="sens-nav" style={props.style}>
            <button className="sens-but sens-left btn-metal" onClick={_=>changeVal("-")}>left</button>
            <input ref={inpref} onKeyDown={e=>onPressEnter(e)} onChange={e=>setRegValue(e.target.value)} value={regValue}></input>
            <button className="sens-but btn-metal" onClick={_=>changeVal("+")}>right</button>
        </div>

    )}

export default ChangeSensor