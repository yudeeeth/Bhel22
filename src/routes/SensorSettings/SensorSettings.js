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
import Button3d from './../../util/Button3d'
import ChangeSensor from "../Change-sensor/Change-sensor";

const SensorSettings = () => {
  const [sensorInput, setSensorInput] = useState([]);
  const [dummy, setDummy] = useState(false);
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
  }, [dummy]);

  let buttonList = [
    { btn: PurgeLog, setValue: 0, val: "Purge Log" },
    { btn: CalLog, setValue: 1, val: "Call Log" },
    { btn: PowerLog, setValue: 2, val: "Power Log" },
    { btn: ErrorLog, setValue: 3, val: "Error Log" },
    { btn: LeakLog, setValue: 4, val: "Leak Log" },
    { btn: AllLogs, setValue: 5, val: "All Logs" },
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

  const SensorValueColumns = (index) => {
    let length = sensorInput.length;
    let ret = [];
    sensorInput.forEach(
      (val, i) => {
        if (i % (length / 4) == index) {
          ret.push(
            <FreqInput
              i={i}
              key={i}
              input={sensorInput[i]}
              frequencyInput={frequencyInput}
            />
          )

        }
      }
    )
    return (
      <div className="freq-inp-row">
        {
          ret.map(e => e)
        }
      </div>
    )
  }



  return (
    <>
      <ChangeSensor callback={setDummy} />
      <div className="sensor-settings-flex sensor-settings-main">
        <div className="sensor-settings-left sensor-settings-col">
          <p className="sensor-settings-threshold-title ">
            Frequency band wise Threshold settings (dB):
          </p>
          <div
            className="sensor-settings-sensor-input"
          >
            {
              '1'.repeat(10).split('').map((val, i) => {
                return SensorValueColumns(i);
              })
            }
          </div>
          <div className="error-legend-con">
            <div className="error-legend"></div> Indicates error
            
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
            <div className="sensor-settings-buttons-con">
              {buttonList.map((button, i) => (
                <Button3d
                  className="sensor-settings-reset-button"
                  onClick={() => {
                    //454 gives error
                    writeBack(0, button.setValue);
                  }}
                  key={i}
                > {button.val} </Button3d>
              ))}
            </div>
          </div>
          <div className="bottom-buttons">
            <Button3d
              style={{ width: "40rem" }}
              onClick={() => {
                writeBack(179, 1);
              }}
            > Save Settings</Button3d>
            <Button3d
              style={{ width: "40rem" }}
              onClick={() => {
                writeBack(178, 1);
              }}
            > copy Settings</Button3d>
          </div>
        </div>
      </div>
    </>
  );
};


export default SensorSettings;
