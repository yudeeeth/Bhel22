import React from "react";
import "./SensorStatus.css";
import useInterval from "../../util/UseInterval";
import ChannelNumbers from "./Components/ChannelNumbers";
import ColorColumns from "./Components/ColorColumns";
import ChangeSensor from "../Change-sensor/Change-sensor";

const SensorStatus = () => {
  const [statusBits, setStatusBits] = React.useState([]);
  const [channelPage, setChannelPage] = React.useState(1);
  const [arrow, setArrow] = React.useState();
  const updateCount = () => {
    console.log(channelPage);
    if (channelPage == 1) {
      setArrow();
      setChannelPage(2);
      // background-image: url ('/image/btn.png');
    } else {
      setChannelPage(1);
    }
  };
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
        <div className="slide-text">Move channels</div>
        <div className="sensor-status-slidecontainer">
          <button className="sensor-status-slider" onClick={updateCount}>
            <span className="material-symbols-outlined">
              {channelPage % 2 == 0 ? "arrow_upward" : "arrow_downward"}
            </span>
          </button>
        </div>
      </div>

      <div className="sensor-status-channeldiv">
        <ChannelNumbers channelPage={channelPage} />
      </div>
      <div className="sensor-status-rightdiv">
        <ColorColumns statusArray={statusBits} />
      </div>
    </div>
  );
};

export default SensorStatus;
