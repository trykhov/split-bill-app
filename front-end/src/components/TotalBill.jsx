import React from "react";
// import { Link } from "react-router-dom";
import logo from "../logo.png";
import "../css/totalBillPage/totalBillPage.css";

const TotalBill = () => {
  return (
    <div id="totalBillPage">
      <header className="appName">
        {/* this will be the container that holds the app logo and name at the top left corner */}
        <img className="appLogo" src={logo} alt="logo" />
        <h1>SplitBill</h1>
      </header>
      <main className="mainUI">
        <form action="">
          <div className="formComponentContainers">
            <h2>Bill Amount</h2>
            <div className="amount">
              <span>$</span>
              <input type="text" placeholder="0.00" />
            </div>
          </div>
          <div className="formComponentContainers">
            <h2>Tip Percentage</h2>
            <div className="amount">
              <span>$</span>
              <input type="text" placeholder="0.00" />
            </div>
          </div>
          <div className="formComponentContainers">
            <h2>Number of People</h2>
            <div className="amount">
              <span>$</span>
              <input type="text" placeholder="0.00" />
            </div>
          </div>
          <div className="formComponentContainers">
            <h2>Total</h2>
            <div className="amount">
              <span>$</span>
              <input type="text" placeholder="0.00" />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TotalBill;
