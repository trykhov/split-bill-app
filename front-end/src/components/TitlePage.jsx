import React from "react";
import { Link } from "react-router-dom";
import "../css/titlePage/titlePage.css";
import logo from "../logo.png";

export default function TitlePage() {
  return (
    <section id="homepage">
      <header>
        <h1 id="title">SplitBill</h1>
      </header>
      <img id="logo" src={logo} alt="logo" />
      <span id="titleDesc">
        The easiest way to split the bill with your friends
      </span>
      <Link
        className="doneButton"
        to="billInfo"
        style={{ textDecoration: "none" }}
      >
        Start
      </Link>
    </section>
  );
}
