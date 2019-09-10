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

  generatePersonList = numberOfPeople => {
    const dummyArr = new Array(numberOfPeople).fill(0);
    return dummyArr.map((list, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="formComponentContainers">
          <div className="personContainer">
            {/* check box */}
            Person {index + 1}
          </div>
          <div className="paymentContainer">
            <button type="button" className="plusSign">
              +
            </button>
            <input
              type="text"
              readOnly
              className="paymentValue"
              defaultValue="$1222.45"
            />
            <button type="button" className="minusSign">
              –
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    const { subTotal, tip, wholeBill, numPpl } = this.props;
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
            {this.generatePersonList(numPpl)}
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
