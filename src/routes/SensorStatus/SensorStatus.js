import React from "react";
import "./SensorStatus.css";
import useInterval from "../../util/UseInterval";
import ChannelNumbers from "./Components/ChannelNumbers";

const BitFlags = (props) => {
  let colNum = props.columnNumber;
  console.log("bitflags", props.statusArray);
  const bitShiftNumber = [
    { id: 1, shift: 3 },
    { id: 2, shift: 12 },
    { id: 3, shift: 11 },
    { id: 4, shift: 14 },
    { id: 5, shift: 15 },
    { id: 6, shift: 2 }, //random
    { id: 7, shift: 5 },
    { id: 8, shift: 6 },
    { id: 9, shift: 4 },
    { id: 10, shift: 7 },
    { id: 11, shift: 1 },
    { id: 12, shift: 2 }, //random
    { id: 13, shift: 2 }, //random
  ];
  const bitflags = [];
  for (let i = 1; i <= 20; i++) bitflags.push(i);

  return (
    <div className="sensor-status-bitflag-col">
      {bitflags.map((item) => {
        let color =
          props.statusArray[item] >>
          bitShiftNumber.filter((e) => e.id == colNum)[0].shift;
        color = color & 1;
        console.log(color);
        let bg = color == 1 ? "red" : "grey";
        return (
          <div
            key={item}
            className="sensor-status-bitflag-box"
            style={{ backgroundColor: bg   }}                                                                                                 
          ></div>
        );
      })}
    </div>
  );
};

const Colors = (props) => {
  const colColour = [
    { id: 1, color: "#efedb0", text: "Cal. Req." },
    { id: 2, color: "#dcd09c", text: "Comm. Fail" },
    { id: 3, color: "#ddcbb3", text: "Self test Error" },
    { id: 4, color: "#e5c2ae", text: "EEPROM Error" },
    { id: 5, color: "#e1a199", text: "Codec Error" },
    { id: 6, color: "#cbacaa", text: "Tempsensor Error" },
    { id: 7, color: "#c1a2c2", text: "Cal. Error" },
    { id: 8, color: "#a8a9be", text: "Purge Req." },
    { id: 9, color: "#aaacec", text: "Calibrating" },
    { id: 10, color: "#bce3e0", text: "Purging" },
    { id: 11, color: "#cedede", text: "Leak Detected" },
    { id: 12, color: "#9fd9a2", text: "Sensor Healthy" },
    { id: 13, color: "#a7caa9", text: "Self test in Progress" },
  ];

  return (
    <div className="sensor-status-color-cols">
      {colColour.map((item) => (
        <div
          className="colors"
          key={item.id}
          style={{ backgroundColor: item.color }}
          title={item.text}
        >
          <BitFlags columnNumber={item.id} statusArray={props.statusArray} />
        </div>
      ))}
    </div>
  );
};



const SensorStatus = () => {
  const [statusBits, setStatusBits] = React.useState([]);
  useInterval(() => {
    fetch("/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q1: [260, 40],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatusBits(data.q1);
        console.log(data.q1);
      });
  }, 1000);

  return (
    <div className="sensor-status-parent-flex">
      <div className="sensor-status-leftdiv">
        <div className="slide-text">Slide to move cursor</div>
        <div className="sensor-status-slidecontainer">
          <input
            type="range"
            min="1"
            max="100"
            className="sensor-status-slider"
          ></input>
        </div>
      </div>

      <div className="sensor-status-channeldiv">
        <ChannelNumbers />
      </div>
      <div className="sensor-status-rightdiv">
        <Colors statusArray={statusBits} />
      </div>
    </div>
  );
};

export default SensorStatus;
