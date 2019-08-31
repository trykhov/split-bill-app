import React from "react";
// import { Link } from 'react-router-dom';
import logo from "../logo.png";
import "../css/numPeople/numPeople.css";

export default function NumPeople() {
  return (
    <div id="numPeoplePage">
      <div className="appName">
        {/* this will be the container that holds the app logo and name at the top left corner */}
        <img className="appLogo" src={logo} alt="logo" />
        <h3>SplitBill</h3>
      </div>
      <div id="numBox">
        <h3 id="howMany">How Many People?</h3>
        <input id="enterNum" />
      </div>
    </div>
  );
}
