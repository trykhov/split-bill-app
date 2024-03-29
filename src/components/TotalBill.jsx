/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line react/destructuring-assignment, react/prop-types
import React from "react";
import { connect } from "react-redux";
import "../css/totalBillPage/totalBillPage.css";
import { addSubtotal, addTip, addPeople, addTotal } from "../actions";

class TotalBill extends React.Component {
  constructor(props) {
    super(props);
    const { subTotal, tip, wholeBill, numPpl } = this.props;
    this.state = {
      subtotal: subTotal === 0 ? "" : `$${subTotal.toFixed(2)}`,
      tipAmount: `$${tip.toFixed(2)}`,
      howManyPeople: numPpl,
      totalAmount: `$${wholeBill.toFixed(2)}`
    };
  }

  // subtotal

  inputSubtotal = inputValue => {
    if (inputValue.target.value === "$") {
      this.setState({ subtotal: "" }); // when the user removes all numbers
    } else if (inputValue.target.value.length > 1) {
      this.setState({ subtotal: `${inputValue.target.value}` });
    } else {
      this.setState({ subtotal: `$${inputValue.target.value}` });
    }
  };

  checkInputSubtotal = () => {
    const confirmSubtotal = this.obeysRegExp(
      document.getElementById("subtotal").value
    );
    const subtotal = document.getElementById("subtotal");
    const propsSubtotal = subtotal.value.substring(1);
    if (confirmSubtotal || Number(propsSubtotal)) {
      subtotal.value = parseFloat(propsSubtotal).toFixed(2);
      this.props.addSubtotal(Number(propsSubtotal));
      this.setState({ subtotal: `$${subtotal.value}` });
    } else {
      subtotal.value = parseFloat(0).toFixed(2);
      this.props.addSubtotal(0);
      this.setState({ subtotal: "" });
      console.log("error");
    }
    setTimeout(() => this.calculateTotalCallback(), 250); // update the state first before running
  };

  // tipping 
  inputTip = inputValue => {
    if (inputValue.target.value === "$") {
      this.setState({ tipAmount: "" }); // when the user removes all numbers
    } else if (inputValue.target.value.length > 1) {
      this.setState({ tipAmount: `${inputValue.target.value}` });
    } else {
      this.setState({ tipAmount: `$${inputValue.target.value}` });
    }
  };

  checkInputTip = () => {
    const confirmSubtotal = this.obeysRegExp(
      document.getElementById("tip").value
    );
    const tip = document.getElementById("tip");
    const propsTip = tip.value.substring(1);
    if (confirmSubtotal || Number(propsTip)) {
      tip.value = parseFloat(propsTip).toFixed(2);
      this.props.addTip(Number(propsTip));
    } else {
      tip.value = parseFloat(0).toFixed(2);
      this.props.addTip(0);
    }
    this.setState({ tipAmount: `$${tip.value}` });
    setTimeout(() => this.calculateTotalCallback(), 250);
  };

  giveTip = percentage => {
    const tipAmount = (this.props.subTotal * percentage).toFixed(2);
    const tip = document.getElementById("tip");
    tip.value = `$${Number(tipAmount).toFixed(2)}`;
    this.props.addTip(Number(tipAmount));
    this.setState({ tipAmount: tip.value });
    setTimeout(() => this.calculateTotalCallback(), 250);
  };

  // adding or subtracting number of people
  addSubtractPeople = amount => {
    const { numPpl } = this.props;
    if (numPpl > 1) {
      this.setState({ howManyPeople: numPpl + amount });
      this.props.addPeople(numPpl + amount);
    } else if ((numPpl === 1 || numPpl === "") && amount > 0) {
      this.setState({ howManyPeople: numPpl + amount });
      this.props.addPeople(numPpl + amount);
    }
  };

  inputNumberOfPeople = inputValue => {
    this.setState({ howManyPeople: inputValue.target.value });
  };

  checkNumberOfPeople = () => {
    const confirmInput = this.obeysRegExp(
      document.getElementById("numPeople").value
    );
    const inputValue = document.getElementById("numPeople");
    if (confirmInput || Number(inputValue)) {
      this.props.addPeople(parseInt(inputValue.value, 10));
      setTimeout(
        () => this.setState({ howManyPeople: parseInt(inputValue.value, 10) }),
        1000
      );
    } else {
      console.log("error");
    }
  };

  //  total bill 

  inputTotal = inputValue => {
    if (inputValue.target.value === "$") {
      this.setState({ totalAmount: "" }); // when the user removes all numbers
    } else if (inputValue.target.value.length > 1) {
      this.setState({ totalAmount: `${inputValue.target.value}` });
    } else {
      this.setState({ totalAmount: `$${inputValue.target.value}` });
    }
  };

  checkInputTotal = () => {
    const confirmTotal = this.obeysRegExp(
      document.getElementById("totalBill").value
    );
    const total = document.getElementById("totalBill");
    const propsTotal = total.value.substring(1);
    if (confirmTotal || Number(propsTotal)) {
      total.value = parseFloat(propsTotal).toFixed(2);
      this.props.addTotal(Number(total.value));
    } else {
      total.value = parseFloat(0).toFixed(2);
      this.props.addTotal(0);
    }
    this.setState({ totalAmount: `$${total.value}` });
    setTimeout(() => this.calculateTipCallback(), 250);
  };
  // Call Warning

  obeysRegExp = value => {
    // checks if they follow regular expression pattern
    const regExp = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$/;
    return regExp.test(value);
  };

  calculateTotalCallback = () => {
    const { subTotal, tip } = this.props;
    const total = document.getElementById("totalBill");
    total.value = (subTotal + tip).toFixed(2);
    this.setState({ totalAmount: `$${total.value}` }); // order matters
    this.props.addTotal(Number(total.value.substring(1)));
  };

  calculateTipCallback = () => {
    const { subTotal, wholeBill } = this.props;
    const diff = document.getElementById("tip");
    diff.value = (wholeBill - subTotal).toFixed(2);
    if (Number(diff.value) >= 0) {
      this.setState({ tipAmount: `$${diff.value}` });
      this.props.addTip(Number(diff.value));
    }
  };

  handleSubmit = event => {
    event.preventDefault(); // prevents page from refreshing
    const confirmSubtotal = this.obeysRegExp(
      document.getElementById("subtotal").value
    );
    const confirmTip = this.obeysRegExp(document.getElementById("tip").value);
    const confirmTotal = this.obeysRegExp(
      document.getElementById("totalBill").value
    );
    if (confirmSubtotal && confirmTip && confirmTotal) {
      this.props.history.push("/modifyBill");
    } else {
      console.log("Something is wrong");
    }
  };

  // ********************************************************************************************************

  render() {
    const { howManyPeople, tipAmount, totalAmount, subtotal } = this.state;
    const { numPpl, wholeBill } = this.props;
    return (
      <section id="totalBillPage">
        <header className="appName">
          <h1>SplitBill</h1>
        </header>
        <main className="mainUI">
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="subtotal">Subtotal</label>
            <div className="formComponentContainers">
              <div className="inputContainer">
                <input
                  id="subtotal"
                  type="text"
                  placeholder="$0.00"
                  onBlur={this.checkInputSubtotal}
                  onChange={this.inputSubtotal}
                  value={subtotal}
                />
              </div>
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
                <button type="button" className="percentage" onClick={() => this.giveTip(0.3)}>
                  30%
                </button>
              </div>
              <hr />
              <div className="bottomPortion">
                <span className="inputDesc">Tip Amount</span>
                <div className="inputContainer">
                  <input
                    id="tip"
                    type="text"
                    placeholder="$0.00"
                    onBlur={this.checkInputTip}
                    onChange={this.inputTip}
                    value={tipAmount}
                  />
                </div>
              </div>
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
                  id="numPeople"
                  type="text"
                  name=""
                  placeholder="1"
                  onBlur={this.checkNumberOfPeople}
                  onChange={this.inputNumberOfPeople}
                  value={howManyPeople}
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
                <span>Each Person Pays ${(wholeBill / numPpl).toFixed(2)}</span>
              </div>
            </div>
            <label htmlFor="totalBill">Total</label>
            <div className="formComponentContainers">
              <div className="inputContainer">
                <input
                  id="totalBill"
                  type="text"
                  placeholder="0.00"
                  onBlur={this.checkInputTotal}
                  onChange={this.inputTotal}
                  value={totalAmount}
                />
              </div>
            </div>
            <button id="modifyButton" type="submit">
              Modify Bill
            </button>
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
