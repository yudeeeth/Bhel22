import React from "react";
import BitFlags from "./BitFlags";

const ColorColumns = (props) => {
  const colColour = [
    { id: 1, color: "#efedb0", text: "Cal. Req.", shift: 3 },
    { id: 2, color: "#dcd09c", text: "Comm. Fail", shift: 12 },
    { id: 3, color: "#ddcbb3", text: "Self test Error", shift: 11 },
    { id: 4, color: "#e5c2ae", text: "EEPROM Error", shift: 14 },
    { id: 5, color: "#e1a199", text: "Codec Error", shift: 15 },
    { id: 6, color: "#cbacaa", text: "Tempsensor Error", shift: 2 }, //random
    { id: 7, color: "#c1a2c2", text: "Cal. Error", shift: 5 },
    { id: 8, color: "#a8a9be", text: "Purge Req.", shift: 6 },
    { id: 9, color: "#aaacec", text: "Calibrating", shift: 4 },
    { id: 10, color: "#bce3e0", text: "Purging", shift: 7 },
    { id: 11, color: "#cedede", text: "Leak Detected", shift: 1 },
    { id: 12, color: "#9fd9a2", text: "Sensor Healthy", shift: 2 }, //random
    { id: 13, color: "#a7caa9", text: "Self test in Progress", shift: 2 }, //random
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
          <BitFlags
            columnNumber={item.id}
            statusArray={props.statusArray}
            shiftVal={item.shift}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorColumns;
