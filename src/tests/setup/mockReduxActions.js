import * as actionTypes from "./mockReduxTypes";


export const mock_addToCart = (product) => {
  return {
    type: actionTypes.MOCK_ADD_TO_CART,
    payload: product,
  };
};

export const mock_removeFromCart = (productID) => {
  return {
    type: actionTypes.MOCK_REMOVE_FROM_CART,
    payload: {
      id: productID,
    },
  };
};

export const mock_updateAttributesInCart = (cartProduct) => {
  return {
    type: actionTypes.MOCK_UPDATE_ATTRIBUTES_IN_CART,
    payload: cartProduct,
  };
};

export const mock_adjustQty = (itemID, value) => {
  return {
    type: actionTypes.MOCK_ADJUST_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const mock_toggleCart = () => {
  return {
    type: actionTypes.MOCK_TOGGLE_CART,
    payload: true,
  };
};

export const mock_toggleCurrency = () => {
  return {
    type: actionTypes.MOCK_TOGGLE_CURRENCY,
    payload: true,
  };
};

export const mock_selectCurrency = (currency) => {
  return {
    type: actionTypes.MOCK_SELECT_CURRENCY,
    payload: currency,
  };
};

// CATEGORIES
export const mock_setCategories = (categories) => {
  return {
    type: actionTypes.MOCK_SET_CATEGORIES_AND_PRODUCTS,
    payload: categories,
  };
};

// CURRENCIES
export const mock_setCurrencies = (currencies) => {
  return {
    type: actionTypes.MOCK_SET_CURRENCIES,
    payload: currencies,
  };
};
