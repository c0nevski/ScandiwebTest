import * as actionTypes from "./shopping-types";

export const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      product: product,
    },
  };
};

export const updateAttributesInCart = (cartProduct, oldProduct) => {
  return {
    type: actionTypes.UPDATE_ATTRIBUTES_IN_CART,
    payload: {
      newProduct: cartProduct,
      oldProduct: oldProduct,
    },
  };
};

export const adjustQty = (item, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      product: item,
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
