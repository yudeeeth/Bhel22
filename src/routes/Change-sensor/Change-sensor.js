import React from 'react'
import './Change-sensor.css'

const ChangeSensor = (props) => {
    const [regValue, setRegValue] = React.useState(props.start ?? 1);
    const inpref = React.useRef(null);

    const changeSensor = (value) => {
        fetch("/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q1: [9, [value]],
            })
        })
    }

    const changeVal = (e) =>{
        onPressEnter({key:"Enter"})
        if(e=="+"){
            if(regValue>=40) setRegValue(1);
            else setRegValue(e=>parseInt(e)+1);
        }
        else{
            if(regValue<=1) setRegValue(40);
            else setRegValue(e=>parseInt(e)-1);
        }
    }

    const onPressEnter = (e) => {
        if(e.key == 'Enter'){
            if(inpref.current.value > 0 && inpref.current.value <= 40)
                {
                    changeSensor(inpref.current.value);
                }
            else{
                inpref.current.value = 1;
                changeSensor(1);
            }
        }
    }

    return (
    
        <div className="sens-nav">
            <button className="sens-but btn-metal" onClick={_=>changeVal("-")}>left</button>
            <input ref={inpref} onKeyDown={e=>onPressEnter(e)} onChange={e=>setRegValue(e.target.value)} value={regValue}></input>
            <button className="sens-but btn-metal" onClick={_=>changeVal("+")}>right</button>
        </div>

    )}

export default ChangeSensor