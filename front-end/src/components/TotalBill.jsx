import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../logo.png";
import "../css/totalBillPage/totalBillPage.css";

class TotalBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billAmount: 0,
      tipAmount: 0,
      number: 1,
      total: 0
    };
  }

  // ************************************************** subtotal ************************************************

  inputSubtotal = subtotal => {
    this.setState({ billAmount: subtotal.target.value }, () =>
      this.calculateTotalCallback()
    );
  };

  // ************************************************** tipping **************************************************
  inputTip = tip => {
    this.setState({ tipAmount: tip.target.value }, () =>
      this.calculateTotalCallback()
    );
  };

  giveTip = percentage => {
    const { billAmount } = this.state;
    const confirmSubtotal = this.obeysRegExp(billAmount);
    if (confirmSubtotal) {
      const tipToPay = (parseFloat(billAmount) * percentage).toFixed(2);
      this.setState({ tipAmount: parseFloat(tipToPay) }, () =>
        this.calculateTotalCallback()
      );
    }
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
  inputTotal = total => {
    this.setState({ total: total.target.value });
  };
  // ********************************************** Call Warning ********************************************

  obeysRegExp = value => {
    // checks if they follow regular expression pattern
    const regExp = /^[0-9]+(\.[0-9]{1,2})?$/;
    return regExp.test(value);
  };

  calculateTotalCallback = () => {
    // using a callback to get the total sum when the billMount is updated
    const { billAmount, tipAmount } = this.state;
    const confirmSubtotal = this.obeysRegExp(billAmount);
    const confirmTipAmount = this.obeysRegExp(tipAmount);
    if (confirmSubtotal && confirmTipAmount) {
      const sum = parseFloat(billAmount) + parseFloat(tipAmount);
      sum.toFixed(2);
      this.setState({ total: sum.toFixed(2) });
    }
  };

  callWarning = (call, type) => {
    const regExp = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!regExp.test(call)) {
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
    const { billAmount, tipAmount, number, total } = this.state;
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
                  onChange={this.inputSubtotal}
                />
              </div>
              {this.callWarning(billAmount, "AMOUNT")}
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
                  onChange={this.inputTip}
                  value={tipAmount}
                />
              </div>
              {this.callWarning(tipAmount, "AMOUNT")}
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
                  onChange={this.inputTotal}
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
