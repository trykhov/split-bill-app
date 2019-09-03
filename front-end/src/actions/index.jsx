export const subTotal = sub => {
  return {
    type: "SUBTOTAL",
    payload: sub
  };
};

export const tipPercentage = (percentage, subtotal) => {
  return {
    type: "TIP",
    payload: (subtotal + percentage * subtotal).toFixed(2)
  };
};

export const numPeople = num => {
  return {
    type: "NUMBER_OF_PEOPLE",
    payload: num
  };
};

export const billTotal = total => {
  return {
    type: "TOTAL",
    payload: total
  };
};
