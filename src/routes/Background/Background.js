import React, { useState, useEffect } from "react";
import "./Background.css";
import Pagenav from "../Pagenav/Pagenav";
import Clock from "react-live-clock";
import { ReactComponent as Logo } from "./Bharat_Heavy_Electricals_Limited-Logo.wine.svg";


const date = new Date();
const showTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - ";

const Background = (props) => {
  return (
    <div className="background-container">
      {props.children}
      <div className="footer">
        <div className="logo">
          <Logo />
        </div>

        <Pagenav />
        <div className="bg-time">
          {showTime}
          <Clock
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"Asia/Calcutta"}
          />
        </div>
      </div>
    </div>
  );
};

export default Background;
