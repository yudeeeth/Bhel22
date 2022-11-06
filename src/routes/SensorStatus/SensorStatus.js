import React from "react";
import "./SensorStatus.css";
import useInterval from "../../util/UseInterval";

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
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

// const ChannelsList = (props) => {
//   const [sensorflags, setSensorflags] = React.useState([]);

//   useInterval(() => {
//     fetch("/read", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         q1: [260, 40],
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         let flags=[]
//         for (let i = 0; i < data.q1.length; i++) {
//           const flag = {
//             id: {i},
//           };
//           flags.push(flag)
          
//         }
//         setSensorflags(flags);
//       });
//   }, 10000);

//   return (
//     <ul>
//       {sensorflags.map((item) => (
//         <li key={item.id}>CH#{item.id}</li>
//       ))}
//     </ul>
//   );
// };

const ChannelsList = (props) => {
    const sensors=[{id:1},{id:2}];
    return (
        
            <ul>
              {sensors.map((item) => (
                <li key={item.id}>CH#{item.id}</li>
              ))}
            </ul>
          );
             };

const SensorStatus = () => {
  return (
    <div className="sensor-status-parent-flex">
      <div className="sensor-status-leftdiv">
        <div className="slide-text">Slide to move cursor</div>
        <div className="sensor-status-slidecontainer">
          <input
            type="range"
            min="1"
            max="100"
            class="sensor-status-slider"
          ></input>
        </div>
      </div>

      <div className="sensor-status-channeldiv">
        <ChannelsList />
      </div>
      <div className="sensor-status-rightdiv">
        <Colors />
      </div>
    </div>
  );
};

export default SensorStatus;
