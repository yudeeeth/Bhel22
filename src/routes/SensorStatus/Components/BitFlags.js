import React from "react";

const BitFlags = (props) => {
  let colNum = props.columnNumber;
  //   console.log("bitflags", props.statusArray);
  const bitflags = [];
  for (let i = 0+props.start*20; i < 20+props.start*20; i++) bitflags.push(i);

  return (
    <div className="sensor-status-bitflag-col">
      {bitflags.map((item) => {
        let color = props.statusArray[item] >> props.shiftVal;
        color = color & 1;
        let bg = color == 1 ? "red" : "grey";
        return (
          <div
            key={item}
            className="sensor-status-bitflag-box"
            style={{ backgroundColor: bg }}
            onMouseIn={()=>document.getElementById(`${item+1}`).classList.add('hover')}
            onMouseOut={()=>document.getElementById(`${item+1}`).classList.remove('hover')}
          ></div>
        );
      })}
    </div>
  );
};

export default BitFlags;
