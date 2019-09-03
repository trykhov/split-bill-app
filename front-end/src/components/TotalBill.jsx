import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../logo.png";
import "../css/totalBillPage/totalBillPage.css";

class TotalBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.subTotal);
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
              <div className="percentageContainer">
                <div className="percentage">0%</div>
                <div className="percentage">10%</div>
                <div className="percentage">15%</div>
                <div className="percentage">20%</div>
                <div className="percentage">25%</div>
                <div className="percentage">Custom</div>
              </div>
              <div className="amount">
                <span>$</span>
                <input type="text" placeholder="0.00" />
              </div>
            </div>
            <div className="formComponentContainers">
              <h2>Number of People</h2>
              <div className="numberOfPeople">
                <div className="plusSign">+</div>
                <input
                  className="numPeople"
                  type="text"
                  name=""
                  id=""
                  placeholder="1"
                />
                <div className="minusSign">–</div>
              </div>
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
  }
}

const mapStateToProps = state => {
  return { subTotal: state.subTotal };
};

export default connect(mapStateToProps)(TotalBill);
