import React from "react";
import "./Pagenav.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

let counter = 1;
let list = {
  1: "",
  2: "barGraph",
  3: "frequencySpectrum",
  4: "realtimetrend",
  5: "mimicscreen",
  6: "sensorProfile",
  7: "systemSettings",
  8: "statussummary",
  9: "help",
};

const Pagenav = () => {
  let navigator = useNavigate();
  const swapPage = (num) => {
    console.log(list[num]);
    navigator("./" + list[num]);
  };
  const homepage = () => {
    counter = 1;
    swapPage(counter);
  };
  const prevpage = () => {
    if (counter == 1) {
      counter = 9;
    } else {
      counter--;
    }
    swapPage(counter);
  };

  const nextpage = () => {
    if (counter == 9) counter = 1;
    else {
      counter++;
    }
    swapPage(counter);
  };

  return (
    <div className="nav">
      <img onClick={() => prevpage()} className="pagenav-prev-but"
      src={require("./Components/leftarrow.png")}
        />
     
      <img onClick={() => homepage()} className="pagenav-home-but"
      src={require("./Components/homelogo.png")}
      
      />
        
      <img onClick={() => nextpage()} className="pagenav-next-but"
       src={require("./Components/rightarrow.png")}
      
      />
       
    </div>
  );
};

export default Pagenav;
