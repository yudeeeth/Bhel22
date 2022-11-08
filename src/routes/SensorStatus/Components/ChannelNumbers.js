
import React from "react"


const ChannelNumbers = (props) => {
    const bitflags = [];
    for (let i = 1; i <= 20; i++) bitflags.push(i);
  
    return (
      <div className="sensor-status-channels">
        {bitflags.map((item) => (
          <div className="sensor-status-channel-numbers" key={item}>
            CH#{item}
            <span className="channel-line" key={item} />
          </div>
        ))}
      </div>
    );
  };

  export default ChannelNumbers