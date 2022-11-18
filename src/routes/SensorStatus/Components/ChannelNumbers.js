import React from "react";

const ChannelNumbers = (props) => {
  const bitflags = [];
  let ChannelPage = props.channelPage;
  let start = (ChannelPage - 1) * 20 + 1;
  let end = 20 * ChannelPage;

  for (let i = start; i <= end; i++) bitflags.push(i);

  return (
    <div className="sensor-status-channels">
      {bitflags.map((item) => (
        <div className="sensor-status-channel-numbers" id={item} key={item}>
          CH#{item}
          <span className="channel-line" key={item} />
        </div>
      ))}
    </div>
  );
};

export default ChannelNumbers;
