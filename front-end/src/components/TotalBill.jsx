import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../css/totalBillPage/totalBillPage.css";
import { addSubtotal, addTip, addPeople, addTotal } from "../actions";

class TotalBill extends React.Component {
  constructor() {
    super();
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
    if (number > 1) {
      this.setState({ number: number + amount });
      // eslint-disable-next-line react/prop-types, no-shadow
      const { addPeople } = this.props;
      addPeople(number + amount);
    } else if (number === 1 && amount > 0) {
      this.setState({ number: number + amount });
      // eslint-disable-next-line react/prop-types, no-shadow
      const { addPeople } = this.props;
      addPeople(number + amount);
    } else if (number === "" && amount > 0) {
      this.setState({ number: number + amount });
      // const { addPeople } = this.props;
      addPeople(number + amount);
    }
  };

  customNumber = amount => {
    let convertToInt = amount.target.value;
    const confirmNumber = this.obeysRegExp(convertToInt);
    if (confirmNumber) {
      convertToInt = parseInt(convertToInt, 10);
      if (convertToInt > 0) {
        this.setState({ number: convertToInt });
        // eslint-disable-next-line react/prop-types, no-shadow
        const { addPeople } = this.props;
        addPeople(convertToInt);
      }
    } else {
      this.setState({ number: convertToInt });
    }
  };

  // ********************************************** total bill **********************************************
  inputTotal = total => {
    this.setState({ total: total.target.value }, () =>
      this.calculateTipCallback()
    );
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
      this.setState({ total: sum.toFixed(2) }, () => {
        // eslint-disable-next-line react/prop-types, no-shadow
        const { addSubtotal, addTip, addTotal } = this.props;
        addSubtotal(billAmount);
        addTip(tipAmount);
        addTotal(sum.toFixed(2));
      });
    }
  };

  calculateTipCallback = () => {
    // in case some knows how much they want to pay in total but they don't know the tip
    const { billAmount, total } = this.state;
    const confirmSubtotal = this.obeysRegExp(billAmount);
    const confirmTotal = this.obeysRegExp(total);
    if (confirmSubtotal && confirmTotal) {
      const diff = parseFloat(total) - parseFloat(billAmount);
      if (diff >= 0) {
        this.setState({ tipAmount: diff.toFixed(2) }, () => {
          // eslint-disable-next-line react/prop-types, no-shadow
          const { addSubtotal, addTip, addTotal } = this.props;
          addSubtotal(billAmount);
          addTip(diff.toFixed(2));
          addTotal(total);
        });
      } else {
        this.setState({ tipAmount: 0 });
      }
    }
  };

  callWarning = (call, type) => {
    const confirmInput = this.obeysRegExp(call);
    if (!confirmInput) {
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
      <section id="totalBillPage">
        <header className="appName">
          {/* this will be the container that holds the app logo and name at the top left corner */}
          <h1>SplitBill</h1>
        </header>
        <main className="mainUI">
          <form action="">
            <label htmlFor="subtotal">Subtotal</label>
            <div className="formComponentContainers" id="subtotal">
              <div className="inputContainer">
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
            <label htmlFor="tip">Tip</label>
            <div className="formComponentContainers">
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
              <hr />
              <div className="bottomPortion">
                <span className="inputDesc">Tip Amount</span>
                <div className="inputContainer">
                  <span>$</span>
                  <input
                    id="tip"
                    type="text"
                    placeholder="0.00"
                    onChange={this.inputTip}
                    value={tipAmount}
                  />
                </div>
              </div>
              {this.callWarning(tipAmount, "AMOUNT")}
            </div>
            <label htmlFor="numberOfPeople">Number of People</label>
            <div className="formComponentContainers">
              <div id="numberOfPeopleContainer">
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
                  id="numberOfPeople"
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
              <hr />
              <div className="bottomPortion">
                <span>
                  Each Person Pays ${" "}
                  {number > 0 ? (total / number).toFixed(2) : 0}
                </span>
              </div>
            </div>
            <label htmlFor="totalBill">Total</label>
            <div className="formComponentContainers">
              <div className="inputContainer">
                <span>$</span>
                <input
                  id="totalBill"
                  type="text"
                  placeholder="0.00"
                  onChange={this.inputTotal}
                  value={total}
                />
              </div>
              {this.callWarning(total, "AMOUNT")}
            </div>
          </form>
        </main>
      </section>
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

export default connect(
  mapStateToProps,
  { addSubtotal, addTip, addPeople, addTotal }
)(TotalBill);
