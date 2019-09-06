import React from "react";
import { connect } from "react-redux";
import logo from "../logo.png";
import "../css/editUser/editUser.css";

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // const { subTotal, tip, wholeBill } = this.props;
    return (
      <section id="editUserPage">
        <header className="appName">
          <img className="appLogo" src={logo} alt="logo" />
          <h1>SplitBill</h1>
        </header>
        <main className="mainUI">
          <div id="billSummary" className="formComponentContainers">
            <h2>Total</h2>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  {/* <td>$ {subTotal}</td> */}
                </tr>
                <tr>
                  <td>Tip</td>
                  {/* <td>$ {tip}</td> */}
                </tr>
                <tr>
                  <td>Total</td>
                  {/* <td>$ {wholeBill}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
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

export default connect(mapStateToProps)(EditUser);
