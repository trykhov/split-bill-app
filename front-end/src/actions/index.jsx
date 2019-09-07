export const addSubtotal = sub => {
  return {
    type: "SUBTOTAL",
    payload: sub
  };
};

export const addTip = amount => {
  return {
    type: "TIP",
    payload: amount
  };
};

export const addPeople = num => {
  return {
    type: "NUMBER_OF_PEOPLE",
    payload: num
  };
};

export const addTotal = total => {
  return {
    type: "TOTAL",
    payload: total
  };
};
