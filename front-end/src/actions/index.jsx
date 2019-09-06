const obeysRegExp = value => {
  // checks if they follow regular expression pattern
  const regExp = /^[0-9]+(\.[0-9]{1,2})?$/;
  return regExp.test(value);
};

export const addSubtotal = async sub => {
  const response = await obeysRegExp(sub);
  if (response) {
    return { type: "SUBTOTAL", payload: sub };
  }
  return "";
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
