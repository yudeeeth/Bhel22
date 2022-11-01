import React from "react";
import { Bar } from "react-chartjs-2";
import useInterval from "../../util/UseInterval";
import Chart from "chart.js/auto";
import './BarGraphScreen.css';

const BarGraphScreen = () => {
  const [sensorValues, setSensorValues] = React.useState([]);
  const [sensorflags, setSensorflags] = React.useState([]);
  const [sub, setSub] = React.useState([1, sensorValues.slice(0, 20)]);

  useInterval(() => {
    fetch("/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q1: [200, 40],
        q2: [260, 40],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSensorValues(data.q1.map((e) => 40 + (e % 81)));
        let flags = [];
        for (let i = 0; i < data.q2.length; i++) {
          if ((data.q2[i] & 1) === 1) {
            flags.push(i + 1);
          }
        }
        let val = sub[0];
        setSensorflags(flags);
        if (val === 1) {
          setSub([1, sensorValues.slice(0, 20)]);
        } else {
          setSub([21, sensorValues.slice(20, 40)]);
        }
      });
  }, 1000);

  const move = (dir) => {
    if (dir == 0) {
      setSub([1, sensorValues.slice(0, 20)]);
    } else {
      setSub([21, sensorValues.slice(20, 40)]);
    }
  };

  return (
    <>
    <div className="bargraph-container">

      <div className="bargraph-title">
        Bargraph
      </div>

        <img
          style={{
            position: "absolute",
            top: "0",
            filter: "opacity(1)",
            width: "100vw",
            height: "50vw",
            zIndex: "-5",
          }}
          // src={require("./Components/bggrey.png")}
        />
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <div style={{ width: "900px", height: "700px", padding: "4rem 4rem 1rem 4rem" }}>
              <Bar
                style={{ backgroundColor: "#d2c1ad" }}
                data={{
                  labels: Array.from({ length: 20 }, (x, i) =>
                    (i + sub[0]).toString()
                  ),
                  datasets: [
                    {
                      label: "Sensors",
                      data: sub[1],
                      backgroundColor: sub[1].map((subs) =>
                        subs >= 100 ? "#b50e2d" : "#0eb562"
                      ),
                    },
                  ],
                }}
                options={{
                  plugins:{
                    legend:false
                  }
                }}
              />
            </div>
          </div>
          {/* <div id="footer" style={{ flexFlow: "row wrap" }}>
            <img
              style={{ padding: "0 10rem", height: "5vw" }}
              src={require("./Components/bhellogo.png")}
            />
            <img
              onClick={() => {
                move(0);
                move(0);
              }}
              src={require("./Components/leftarrow.png")}
              style={{ width: "5vw", height: "5vw" }}
            />
            <img
              src={require("./Components/home.png")}
              style={{ width: "5vw", height: "5vw" }}
            />
            <img
              onClick={() => {
                move(1);
              }}
              src={require("./Components/rightarrow.png")}
              style={{ width: "5vw", height: "5vw" }}
            />
            <img
              style={{ padding: "0 10rem", filter: "opacity(0)" }}
              src={require("./Components/bhellogo.png")}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BarGraphScreen;
