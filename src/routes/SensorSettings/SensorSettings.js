import "./SensorSettings.css";
import { useEffect, useState } from "react";

import FreqInput from "./SensorSettings-FreqInput.js"

import AllLogs from "./buttons/AllLogs.png";
import CalLog from "./buttons/CalLog.png";
import CopySettings from "./buttons/CopySettings.png";
import ErrorLog from "./buttons/ErrorLog.png";
import LeakLog from "./buttons/LeakLog.png";
import PowerLog from "./buttons/PowerLog.png";
import PurgeLog from "./buttons/PurgeLog.png";
import SaveSettings from "./buttons/SaveSettings.png";
import ChangeSensor from "../Change-sensor/Change-sensor";

const SensorSettings = () => {
  const [sensorInput, setSensorInput] = useState([]);

  const [alarmThresh, setAlarmThresh] = useState(60);
  const [delaySetpoint, setDelaySetpoint] = useState(0);
  const [lowerLimit, setLowerLimit] = useState(40);
  const [upperLimit, setUpperLimit] = useState(100);

  useEffect(() => {
    fetch("/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freqData: [146, 32],
        alarmThresh: [130, 1],
        delaySetpoint: [131, 1],
        lowerLimit: [132, 1],
        upperLimit: [133, 1],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSensorInput(data.freqData);
        setAlarmThresh(data.alarmThresh[0]);
        setDelaySetpoint(data.delaySetpoint[0]);
        setLowerLimit(data.lowerLimit[0]);
        setUpperLimit(data.upperLimit[0]);
      });
  }, []);

  let buttonList = [
    { btn: PurgeLog, setValue: 0 },
    { btn: CalLog, setValue: 1 },
    { btn: PowerLog, setValue: 2 },
    { btn: ErrorLog, setValue: 3 },
    { btn: LeakLog, setValue: 4 },
    { btn: AllLogs, setValue: 5 },
  ];

  const writeBack = (location, setValue) => {
    fetch("/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q1: [location, [setValue]],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.q1 == false) {
          console.log("error write");
        } else {
          console.log("set bit to : " + setValue + " of tag " + location);
        }
      });
  };

  const frequencyInput = (ind, newValue) => {
    let arr = [];
    for (let i = 0; i < 32; i++) {
      if (i == ind) arr[i] = newValue;
      else arr[i] = sensorInput[i];
    }
    setSensorInput(arr);

    fetch("/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sensorInput: [146 + ind, [newValue]],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.sensorInput == false) {
          console.log("error freq");
        }
      });
  };

  useEffect(() => {
    fetch("/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alarmThresh: [130, [alarmThresh]],
        delaySetpoint: [131, [delaySetpoint]],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.alarmThresh == false || data.delaySetpoint == false) {
          console.log("error thresh");
        }
      });
  }, [alarmThresh, delaySetpoint]);

  useEffect(() => {
    fetch("/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lowerLimit: [132, [lowerLimit]],
        upperLimit: [133, [upperLimit]],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.upperLimit == false || data.lowerLimit == false) {
          console.log("error limits");
        }
      });
  }, [upperLimit, lowerLimit]);

  return (
    <>
    <ChangeSensor />
    <div className="sensor-settings-flex">
      <div className="sensor-settings-left sensor-settings-col">
        <p className="sensor-settings-threshold-title ">
          Frequency band wise Threshold settings (dB):
        </p>
        <div className="sensor-settings-sensor-input">
          <div>
            {sensorInput.map(
              (input, i) =>
                i + 1 < 10 && (
                  <FreqInput
                  i={i}
                  input={sensorInput[i]}
                  frequencyInput={frequencyInput}
                  />
                  )
                  )}
            {sensorInput.map(
              (input, i) =>
              i + 1 >= 10 &&
              i + 1 <= 16 && (
                <FreqInput
                i={i}
                input={sensorInput[i]}
                frequencyInput={frequencyInput}
                />
                )
                )}
          </div>
          <div>
            {sensorInput.map(
              (input, i) =>
              i + 1 > 16 && (
                <FreqInput
                i={i}
                input={sensorInput[i]}
                frequencyInput={frequencyInput}
                />
                )
                )}
          </div>
        </div>
      </div>
      <div className="sensor-settings-right">
        <div className="sensor-settings-col">
          <p className="sensor-settings-alarm-title ">Sensor Alarm Settings:</p>
          <div className="sensor-settings-alarm">
            <div>
              <p
                style={
                  alarmThresh < 60 || alarmThresh > 120 ? { color: "red" } : {}
                }
                >
                Alarm Threshold (dB){" "}
              </p>
              <p
                style={
                  delaySetpoint < 0 || delaySetpoint > 30
                  ? { color: "red" }
                  : {}
                }
                >
                Delay Setpoint (s){" "}
              </p>
            </div>
            <div>
              <input
                className="sensor-settings-alarm-input"
                value={alarmThresh}
                onChange={(inp) => {
                  setAlarmThresh(inp.target.value);
                }}
                type="number"
                />
              <br />
              <input
                className="sensor-settings-alarm-input"
                value={delaySetpoint}
                onChange={(inp) => {
                  setDelaySetpoint(inp.target.value);
                }}
                type="number"
                />
            </div>
          </div>
        </div>
        <div className="sensor-settings-col">
          <p className="sensor-settings-nominal-title ">Nominal Sound Level:</p>
          <div className="sensor-settings-nominal">
            <div>
              <p
                style={
                  lowerLimit < 40 || lowerLimit > 60 ? { color: "red" } : {}
                }
                >
                Lower Limit (dB){" "}
              </p>
              <p
                style={
                  upperLimit < 100 || upperLimit > 120 ? { color: "red" } : {}
                }
                >
                Upper Limit (dB){" "}
              </p>
            </div>
            <div>
              <input
                className="sensor-settings-alarm-input"
                value={lowerLimit}
                onChange={(inp) => {
                  setLowerLimit(inp.target.value);
                }}
                type="number"
                />
              <br />
              <input
                className="sensor-settings-alarm-input"
                value={upperLimit}
                onChange={(inp) => {
                  setUpperLimit(inp.target.value);
                }}
                type="number"
                />
            </div>
          </div>
        </div>
        <div className="sensor-settings-col">
          <p className="sensor-settings-reset-title ">Reset:</p>
          {buttonList.map((button, i) => (
            <img
            src={button.btn}
            className="sensor-settings-reset-button"
            onClick={() => {
              //454 gives error
              writeBack(0, button.setValue);
            }}
            key={i}
            />
            ))}
        </div>
        <div>
          <img
            src={SaveSettings}
            className="sensor-settings-main-button1"
            onClick={() => {
              writeBack(179, 1);
            }}
            />
          <img
            src={CopySettings}
            className="sensor-settings-main-button2"
            onClick={() => {
              writeBack(178, 1);
            }}
            />
        </div>
      </div>
    </div>
    </>
  );
};


export default SensorSettings;
