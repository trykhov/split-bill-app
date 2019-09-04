import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../logo.png";
import "../css/totalBillPage/totalBillPage.css";

class TotalBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billAmount: (0.0).toFixed(2),
      tipAmount: (0.0).toFixed(2),
      number: 1,
      total: (0.0).toFixed(2),
      warning: false
    };
  }

  // ************************************************** subtotal ************************************************

  billWithoutTip = subTotal => {
    const money = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (money.test(subTotal.target.value)) {
      const convertToFloat = parseFloat(subTotal.target.value);
      this.setState({ billAmount: convertToFloat, warning: false });
    } else {
      this.setState({ tipAmount: 0, total: 0, warning: true });
    }
  };

  // ************************************************** tipping **************************************************
  customTip = tip => {
    // users can enter their own tip
    this.setState({ tipAmount: tip.target.value });
  };

  giveTip = percentage => {
    const { billAmount } = this.state;
    const tip = parseFloat(billAmount * percentage);
    this.setState({ tipAmount: tip.toFixed(2) });
  };

  // ************************** adding or subtracting number of people **********************************
  addSubtractPeople = amount => {
    const { number } = this.state;
    if (number > 0) {
      this.setState({ number: number + amount });
    } else if (number === 0 && amount > 0) {
      this.setState({ number: number + amount });
    } else if (number === "" && amount > 0) {
      this.setState({ number: amount });
    }
  };

  customNumber = amount => {
    let convertToInt = amount.target.value;
    if (convertToInt !== "") {
      convertToInt = parseInt(convertToInt, 10);
      this.setState({ number: convertToInt });
    } else {
      this.setState({ number: convertToInt });
    }
  };

  // ********************************************** total bill **********************************************
  customTotal = total => {
    let convertToInt = total.target.value;
    if (convertToInt !== "") {
      convertToInt = parseFloat(convertToInt);
      this.setState({ total: convertToInt });
    } else {
      this.setState({ total: convertToInt });
    }
  };
  // ********************************************** Call Warning ********************************************

  callWarning = (call, type) => {
    if (call) {
      switch (type) {
        case "PEOPLE":
          return (
            <span className="warning">
              Please enter a valid number greater than 0
            </span>
          );
        case "AMOUNT":
          return (
            <span className="warning">
              Please enter a valid number in the format of x.xx or x
            </span>
          );
        default:
      }
    }
    return "";
  };

  // ********************************************************************************************************

  render() {
    const { tipAmount, number, total, warning } = this.state;
    return (
      <div id="totalBillPage">
        <header className="appName">
          {/* this will be the container that holds the app logo and name at the top left corner */}
          <img className="appLogo" src={logo} alt="logo" />
          <h1>SplitBill</h1>
        </header>
        <main className="mainUI">
          <form action="">
            <div className="formComponentContainers" id="subtotal">
              <h2>Bill Amount</h2>
              <div className="amount">
                <span>$</span>
                <input
                  id="subtotal"
                  type="text"
                  placeholder="0.00"
                  onChange={this.billWithoutTip}
                />
              </div>
              {this.callWarning(warning, "AMOUNT")}
            </div>
            <div className="formComponentContainers">
              <h2>Tip Percentage</h2>
              <div className="percentageContainer">
                <button
                  type="button"
                  className="percentage"
                  onClick={() => this.giveTip(0)}
                >
                  0%
                </button>
                <button
                  type="button"
                  className="percentage"
                  onClick={() => this.giveTip(0.1)}
                >
                  10%
                </button>
                <button
                  type="button"
                  className="percentage"
                  onClick={() => this.giveTip(0.15)}
                >
                  15%
                </button>
                <button
                  type="button"
                  className="percentage"
                  onClick={() => this.giveTip(0.2)}
                >
                  20%
                </button>
                <button
                  type="button"
                  className="percentage"
                  onClick={() => this.giveTip(0.25)}
                >
                  25%
                </button>
                <button type="button" className="percentage">
                  Custom
                </button>
              </div>
              <div className="amount">
                <span>$</span>
                <input
                  type="text"
                  placeholder="0.00"
                  onChange={this.customTip}
                  value={tipAmount}
                />
              </div>
            </div>
            <div className="formComponentContainers">
              <h2>Number of People</h2>
              <div className="numberOfPeople">
                <button
                  type="button"
                  className="plusSign"
                  onClick={() => this.addSubtractPeople(1)}
                >
                  +
                </button>
                <input
                  className="numPeople"
                  type="text"
                  name=""
                  id=""
                  placeholder="1"
                  onChange={this.customNumber}
                  value={number}
                />
                <button
                  type="button"
                  className="minusSign"
                  onClick={() => this.addSubtractPeople(-1)}
                >
                  –
                </button>
              </div>
              <div className="amount">
                <span>Each person owes you: ${number}</span>
              </div>
            </div>
            <div className="formComponentContainers">
              <h2>Total</h2>
              <div className="amount">
                <span>$</span>
                <input
                  type="text"
                  placeholder="0.00"
                  onChange={this.customTotal}
                  value={total}
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subTotal: state.subTotal,
    tip: state.withTip,
    numPpl: state.numPpl,
    wholeBill: state.wholeBill
  };
};

export default connect(mapStateToProps)(TotalBill);
