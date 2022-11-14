import "./SensorSettings.css"

const FreqInput = (props) => (
    <div key={props.i} style={props.input > 120 || props.input < 60 ? { outline: "solid 2px red" } : {}} 
    className="freq-inp">
      {console.log(props.i)}
      <label
        className="sensor-settings-threshold-label"
      >
        Freq. band 0{props.i + 1} :
      </label>
      <input
        className="sensor-settings-threshold-input"
        onChange={(res) => {
          props.frequencyInput(props.i, res.target.value);
        }}
        onBlur={(e)=>{
          if(props.i,props.input > 120 || props.input < 60)
            setTimeout(()=>{e.target.focus()},50);
          props.frequencyInput(props.i,props.input > 120 || props.input < 60 ? 90 : e.target.value);
        }}
        type="number"
        value={props.input}
      ></input>
      <br />
    </div>
  );

export default FreqInput