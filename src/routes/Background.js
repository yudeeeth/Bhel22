import React, { useState, useEffect } from "react";
import "./Background.css";
import Pagenav from "./Pagenav";
import Clock from "react-live-clock";
import { ReactComponent as Logo } from "./Bharat_Heavy_Electricals_Limited-Logo.wine.svg";

const date = new Date();
const showTime =
  date.getDate() +
  "/" +
  (date.getMonth() + 1) +
  "/" +
  date.getFullYear() +
  " - ";

const Background = () => {
  return (
    <body>
      <Pagenav />

      <div class="footer">
        <div class="logo">
          <Logo />
        </div>

        <div class="time">
          {showTime}
          <Clock
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"Asia/Calcutta"}
          />
        </div>
      </div>
    </body>
  );
};

export default Background;
