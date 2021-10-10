import * as actionTypes from "./shopping-types";

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const adjustQty = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const toggleCart = () => {
  return {
    type: actionTypes.TOGGLE_CART,
    payload: true,
  }
}

export const toggleCurrency = () => {
  return {
    type: actionTypes.TOGGLE_CURRENCY,
    payload: true,
  }
}

export const selectCurrency = (currency) => {
  return {
    type: actionTypes.SELECT_CURRENCY,
    payload: currency,
  }
}
