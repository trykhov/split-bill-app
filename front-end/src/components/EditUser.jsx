/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import "../css/editUser/editUser.css";

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { subTotal, tip, wholeBill } = this.props;
    return (
      <section id="editUserPage">
        <main className="mainUI">
          <button
            id="backButton"
            type="button"
            onClick={() => this.props.history.push("/billInfo")}
          >
            <i
              className="fas fa-chevron-left fa-2x"
              style={{ color: "#fff" }}
            />
            <span>Back</span>
          </button>
          <form action="">
            <label htmlFor="numberOfPeople">Total</label>
            <div id="billSummary" className="formComponentContainers">
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        value={`$${subTotal.toFixed(2)}`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tip:</td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        value={`$${tip.toFixed(2)}`}
                      />
                    </td>
                  </tr>
                  <tr style={{ borderTop: "1px solid #000000" }}>
                    <td>Total:</td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        value={`$${wholeBill.toFixed(2)}`}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
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

export default connect(mapStateToProps)(EditUser);
