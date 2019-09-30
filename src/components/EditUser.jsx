/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import "../css/editUser/editUser.css";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numUnChecked: this.props.numPpl,
      remainingAmount: this.props.wholeBill
    };
  }

  checkCheckBox = index => {
    const { numUnChecked, remainingAmount } = this.state;
    if (document.getElementById(`hasPaid${index}`).checked) {
      this.setState({ numUnChecked: numUnChecked - 1, remainingAmount: remainingAmount - Number(document.getElementById(`person${index}`).value)});
    } else {
      this.setState({ numUnChecked: numUnChecked + 1, remainingAmount: remainingAmount + Number(document.getElementById(`person${index}`).value)});
    }
  };

  addSubtractDollar = (index, amount) => {
    const { numUnChecked, remainingAmount } = this.state;
    if (!document.getElementById(`hasPaid${index}`).checked) {
      // if the box is not checked, you can still add more to pay
      const personAmount = document.getElementById(`person${index}`);
      // changing the value of the input
      const newValue = (Number(personAmount.value) + amount).toFixed(2); 
      // substracting from remaining value doesn't go over && value isn't negative
      if(remainingAmount - newValue > 0 && newValue > 0 && remainingAmount - Number(personAmount.value) > 0) { 
        personAmount.value = (Number(personAmount.value) + amount).toFixed(2); 
         // get all the payment boxes (people)
        const peopleToPay = document.getElementsByClassName("hasToPay");
        let newRemain = remainingAmount - newValue;
        for (let i = 1; i <= peopleToPay.length; i += 1) {
          const confirmCheckBox = document.getElementById(`hasPaid${i}`).checked;
          const deduceTarget = document.getElementById(`person${i}`);
          if (!confirmCheckBox && i !== index) {
            const potentialValue = Number(deduceTarget.value) - amount / (numUnChecked - 1).toFixed(2);
            // value can't become negative
            if(potentialValue > 0 && newRemain > 0) {
              newRemain -= potentialValue;
              deduceTarget.value = potentialValue.toFixed(2);
            } 
          }
        }
      }
    }
  };

  generatePersonList = numberOfPeople => {
    const people = [];
    const { wholeBill } = this.props;
    for(let i = 0; i < numberOfPeople; i += 1) {
      people.push(
        <div className="peoplePaying">
          <div className="personContainer">
            <input
              type="checkbox"
              id={`hasPaid${i + 1}`}
              className="hasToPay"
              onClick={() => this.checkCheckBox(i + 1)}
            />
            Person {i + 1}
          </div>
          <div className="formComponentContainers">
            <div className="paymentContainer">
              <button
                type="button"
                className="plusSign"
                onClick={() => this.addSubtractDollar(i + 1, 1)}
              >
                +
              </button>
              <input
                type="text"
                readOnly
                className="paymentValue"
                id={`person${i + 1}`}
                defaultValue={(wholeBill / numberOfPeople).toFixed(2)}
              />
              <button
                type="button"
                className="minusSign"
                onClick={() => this.addSubtractDollar(i + 1, -1)}
              >
                –
              </button>
            </div>
          </div>
          <hr />
        </div>
      );
    }
    return people;
  };

  render() {
    const { subTotal, tip, wholeBill, numPpl } = this.props;
    return (
      <section id="editUserPage">
        <header className="appName">
          {/* this will be the container that holds the app logo and name at the top left corner */}
          <h1>SplitBill</h1>
        </header>
        <main className="mainUI">
          <button
            id="backButton"
            type="button"
            onClick={() => this.props.history.push("/billInfo")}
          >
            <i className="fas fa-chevron-left" style={{ color: "#fff" }} />
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
