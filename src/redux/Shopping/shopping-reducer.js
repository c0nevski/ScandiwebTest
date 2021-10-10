import * as actionTypes from "./shopping-types";
import { productsClothes, productsTech } from './initial_state_mock';

// MOCK PRODUCT DATA
const INITIAL_STATE = {
  categories: [{ name: "clothes" }, { name: "tech" }],
  products: [
    ...productsClothes,
    ...productsTech,
  ],
  cart: {
    priceTotal: "$100.00",
    products: [],
    isOpen: false,
  },
  currency: {
    list: ["USD", "GBP", "AUD", "JPY", "RUB"],
    selectedCurrency: "USD",
    isOpen: false,
  },
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get item from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if item is already in cart
      const inCart = state.cart.products.find((item) =>
        item.id === action.payload.id ? true : false
      );
      // Add item to cart
      return {
        ...state,
        cart: {
          ...state.cart,
          products: inCart
            ? state.cart.products.map((p) =>
                p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p
              )
            : [...state.cart.products, { ...item, qty: 1 }],
        },
      };
    case actionTypes.REMOVE_FROM_CART:
      return {};
    case actionTypes.ADJUST_QTY:
      return {};
    case actionTypes.LOAD_CURRENT_ITEM:
      return {};
    case actionTypes.TOGGLE_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      };
    case actionTypes.TOGGLE_CURRENCY:
      return {
        ...state,
        currency: {
          ...state.currency,
          isOpen: !state.currency.isOpen,
        },
      };
    case actionTypes.SELECT_CURRENCY:
      return {
        ...state,
        currency: {
          ...state.currency,
          selectedCurrency: action.payload,
        },
      };
    default:
      return state;
  }
};

export default shopReducer;
