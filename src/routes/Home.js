import React from "react";
import "./Home.css";
import Sensors from "./Change-sensor";
import Background from "./Background";
import bhelsonic from "./bhelsonic-text.png";

function Welcome(props) {
  return (
    <div>
      <button class="btn">{props.name}</button>
    </div>
  );
}

const Home = () => {
  return (
    <div className="flex-parent-container">
      <Sensors />
      <div>
      <div class="flex-container-1">
        <div class="bar-graph">
          <Welcome name="Bar Graph" />
        </div>
        <div class="freq-spec">
          <Welcome name="Frequency Spectrum" />
        </div>

        <div class="trends">
          <Welcome name="Trends" />
        </div>
      </div>

      <div class="flex-container-2">
        <div class="mimic">
          <Welcome name="Mimic" />
        </div>

        <div class="sonic">
          <img src={bhelsonic}></img>
        </div>

        <div class="sens-prof">
          <Welcome name="Sensor Profiles" />
        </div>
      </div>
      <div class="flex-container-3">
        <div class="settings">
          <Welcome name="Settings" />
        </div>
        <div class="status">
          <Welcome name="Status Summary" />
        </div>
        <div class="help">
          <Welcome name="Help" />
        </div>
      </div>
      </div>
      <Background />
     
    </div>
  );
};
export default Home;
