import React from "react";
import { Link } from "react-router-dom";
import "../css/titlePage/titlePage.css";
import logo from "../logo.png";

export default function TitlePage() {
  return (
    <div id="homepage">
      <h3 id="title">SplitBill</h3>
      <img id="logo" src={logo} alt="logo" />
      <span id="titleDesc">
        The easiest way to split the bill with your friends
      </span>
      <Link
        className="doneButton"
        to="billInfo"
        style={{ textDecoration: "none" }}
      >
        <span>Start</span>
      </Link>
    </div>
  );
}
