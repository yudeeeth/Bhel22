import React from "react";
import "./SystemSettings.css";

const SensorInput = () => {
  const sInput = [];
  for (let j = 0; j < 5; j++) {
    let sIntermediate = [];
    for (let i = 0; i < 4; i++) {
      sIntermediate.push(
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "spaceBetween",
            alignItems: "center",
          }}
        >
          <p style={{ color: "#000000" }}>Ch# {i + 1 + j * 4} </p>
          <input
            key={i + 1 + j * 4}
            id={i + 1 + j * 4}
            style={{
              height: "1rem",
              width: "3rem",
              backgroundColor: "#ffffff",
              margin: "0rem 2rem 0rem 2rem",
            }}
          />
        </div>
      );
    }
    sInput.push(
      <div className="system-settings-input-sensors" key={j * 100} id={j * 100}>
        {sIntermediate}
      </div>
    );
  }
  console.log(sInput);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sInput}
      </div>
    </>
  );
};

const SystemSettings = () => {
  return (
    <div className="system-settings-container">
      <div className="system-settings-title">System Settings</div>
      <div className="system-settings-containerbottom">
        <div className="system-settings-left">
          <div className="system-settings-box">
            <div
              style={{
                color: "#0eb562",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Maintenance
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              Calibration Interval (days)
              <input className="system-settings-input" />
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              Purge Interval (days)
              <input className="system-settings-input" />
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              Purge Duration (sec)
              <input className="system-settings-input" />
            </div>
          </div>

          <div className="system-settings-box">
            <div
              style={{
                color: "#b50e2d",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Digital Outputs :
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Alarm
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Purging
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Error
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Spare
            </div>
          </div>

          <div className="system-settings-box">
            <div
              style={{
                color: "#62278f",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Digital Inputs :
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Alarm Inhibit
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Auto Purging ENABLED
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Power Status 1
            </div>
            <div style={{ flexdirection: "row", padding: "0.5rem" }}>
              <img
                className="system-settings-button"
                src={require("./Components/button.png")}
              />
              Power Status 2
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="system-settings-rightbox">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0rem 1rem 1rem 1rem",
                margin: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontWeight: "bold",
                  color: "#b50e2d",
                  margin: "0rem 6rem 0rem 0rem",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#b50e2d",
                    padding: "0rem 0.1rem 0rem 0rem",
                  }}
                >
                  No. of Sensors :
                </div>
                <div style={{ fontWeight: "bold", color: "#0eb562" }}>0</div>
              </div>

              <div
                style={{
                  flexDirection: "row",
                  margin: "0rem 9rem 0rem 3rem",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#253c7a",
                    margin: "0rem 0rem 0rem 3rem",
                  }}
                >
                  Sensor Mapping :
                </div>
                <div style={{ fontWeight: "bold", color: "#b3b3b3" }}>
                  [0-Not Connected 1-COM1 2-COM2]
                </div>
              </div>
            </div>

            <div
              style={{
                height: "15vw",
                opacity: "0.5",
                borderRadius: "3vw",
                margin: "1rem 1rem 2rem 1rem",
              }}
            >
              <SensorInput />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "2rem 0rem 0rem 0rem",
            }}
          >
            <div className="system-settings-rightboxbottom">
              <div
                style={{
                  color: "#482b7a",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Communication Settings :
              </div>
              <div style={{ flexDirection: "row", padding: "0.5rem" }}>
                NFC timeout (sec)
                <input className="system-settings-input" />
              </div>
              <div style={{ flexDirection: "row", padding: "0.5rem" }}>
                RS485 timeout (sec)
                <input className="system-settings-input" />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                style={{
                  width: "10rem",
                  height: "2rem",
                  backgroundColor: "##0cc9b0",
                  fontWeight: "bold",
                  border: "none",
                  boxShadow: "0px 5px 5px 3px",
                  borderRadius: "5px",
                  margin: "0rem 4rem 2rem 4rem",
                }}
              >
                Sensor Settings
              </button>
              <button
                style={{
                  width: "10rem",
                  height: "2rem",
                  backgroundColor: "##0ce8ad",
                  fontWeight: "bold",
                  border: "none",
                  boxShadow: "0px 5px 5px 3px",
                  borderRadius: "5px",
                  margin: "2rem 4rem 0rem 4rem",
                }}
              >
                Save Settings
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  width: "8rem",
                  height: "4rem",
                  backgroundColor: "#b50e2d",
                  fontWeight: "bold",
                  border: "none",
                  boxShadow: "0px 5px 5px 3px",
                  borderRadius: "5px",
                  margin: "2rem 2rem 2rem 2rem",
                }}
              >
                Self Test All Sensors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
