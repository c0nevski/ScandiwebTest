import * as actionTypes from "./shopping-types";

export const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: productID,
    },
  };
};

export const updateAttributesInCart = (cartProduct) => {
  return {
    type: actionTypes.UPDATE_ATTRIBUTES_IN_CART,
    payload: cartProduct,
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
