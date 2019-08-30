import React from "react";
import { Link } from "react-router-dom";
import "../css/titlePage.css";
import logo from "../logo.png";

export default function TitlePage() {
  return (
    <div id="homepage">
      <h3 id="title">SplitBill</h3>
      <img id="logo" src={logo} alt="logo" />
      <h3 id="titleDesc">
        The easiest way to split the bill with your friends
      </h3>
      <Link
        className="doneButton"
        to="billInfo"
        style={{ textDecoration: "none" }}
      >
        <h3>Start</h3>
      </Link>
    </div>
  );
}
