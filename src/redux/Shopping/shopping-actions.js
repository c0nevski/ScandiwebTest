import * as actionTypes from "./shopping-types";

export const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: product,
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
  };
};

export const toggleCurrency = () => {
  return {
    type: actionTypes.TOGGLE_CURRENCY,
    payload: true,
  };
};

export const selectCurrency = (currency) => {
  return {
    type: actionTypes.SELECT_CURRENCY,
    payload: currency,
  };
};

// CATEGORIES
export const setCategories = (categories) => {
  return {
    type: actionTypes.SET_CATEGORIES_AND_PRODUCTS,
    payload: categories,
  };
};

// CURRENCIES
export const setCurrencies = (currencies) => {
  return {
    type: actionTypes.SET_CURRENCIES,
    payload: currencies,
  };
};
