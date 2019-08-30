import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "../css/totalBillPage.css";

const TotalBill = () => {
  return (
    <div id="totalBillPage">
      <header className="appName">
        {/* this will be the container that holds the app logo and name at the top left corner */}
        <img className="appLogo" src={logo} alt="logo" />
        <h1>SplitBill</h1>
      </header>
      <main id="billInfo">
        <div id="billTotal">
          <label htmlFor="bill-total" className="info">
            Bill Total
          </label>
          <div className="inputContainer">
            <span className="dollarSign">$</span>
            <input
              id="bill-total"
              type="text"
              className="inputAmount"
              placeholder="0.00"
            />
          </div>
        </div>
        <div id="tip">
          <h3 className="info">Tip Amount</h3>
          <div className="inputContainer">
            <span className="dollarSign">$</span>
            <input type="text" className="inputAmount" placeholder="0.00" />
          </div>
        </div>
        <div id="total">
          <h3 className="info">Total</h3>
          <div className="inputContainer">
            <span className="dollarSign">$</span>
            <input type="text" className="inputAmount" placeholder="0.00" />
          </div>
        </div>
        <div className="doneButton">
          <Link to="numberOfPeople" style={{ textDecoration: "none" }}>
            <h3>Next</h3>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TotalBill;
