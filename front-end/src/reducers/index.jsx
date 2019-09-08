import { combineReducers } from "redux";

const billAmount = (subTotal = "", action) => {
  switch (action.type) {
    case "SUBTOTAL":
      return action.payload;
    default:
      return subTotal;
  }
};

const tip = (withTip = 0, action) => {
  switch (action.type) {
    case "TIP":
      return action.payload;
    default:
      return withTip;
  }
};

const addPeople = (num = 1, action) => {
  switch (action.type) {
    case "NUMBER_OF_PEOPLE":
      return action.payload;
    default:
      return num;
  }
};

const entireBill = (total = 0, action) => {
  switch (action.type) {
    case "TOTAL":
      return action.payload;
    default:
      return total;
  }
};

export default combineReducers({
  subTotal: billAmount,
  withTip: tip,
  numPpl: addPeople,
  wholeBill: entireBill
});
