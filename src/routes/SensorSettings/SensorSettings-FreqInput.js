import "./SensorSettings.css"

const FreqInput = (props) => (
    <div key={props.i}>
      <label
        className="sensor-settings-threshold-label"
        style={props.input > 120 || props.input < 60 ? { color: "red" } : {}}
      >
        Freq. band 0{props.i + 1} :
      </label>
      <input
        className="sensor-settings-threshold-input"
        onChange={(res) => {
          props.frequencyInput(props.i, res.target.value);
        }}
        type="number"
        value={props.input}
      ></input>
      <br />
    </div>
  );

export default FreqInput