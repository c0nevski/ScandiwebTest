import * as actionTypes from "./shopping-types";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

// MOCK PRODUCT DATA
const INITIAL_STATE = {
  categories: [],
  cart: {
    priceTotal: 0,
    products: [],
    isOpen: false,
  },
  currency: {
    list: [],
    selectedCurrency: "",
    isOpen: false,
  },
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      const cats = action.payload.map((cat) => {
        return { name: cat.name };
      });
      return {
        ...state,
        categories: [...cats],
      };
    case actionTypes.SET_CURRENCIES:
      // This should come from an API in the future if more currencies are added.
      const currencySymbols = [
        { name: "USD", symbol: "$" },
        { name: "JPY", symbol: "¥" },
        { name: "AUD", symbol: "$" },
        { name: "GBP", symbol: "£" },
        { name: "RUB", symbol: "₽" },
      ];
      return {
        ...state,
        currency: {
          ...state.currency,
          list: action.payload.map((c) => {
            return currencySymbols.find((currency) => currency.name === c);
          }),
          selectedCurrency: action.payload[0],
        },
      };

    case actionTypes.ADD_TO_CART:
      // Get item from payload
      const product = action.payload;

      // Check if item is already in cart
      const inCart = state.cart.products.find((item) => {
        const equalId = item.id === product.id;
        const equalAttributes = _.isEqual(item.attributes, product.attributes);
        // product in cart === payload product
        if (equalId && equalAttributes) {
          return true;
        } else {
          return false;
        }
      });

      // Add item to cart
      return {
        ...state,
        cart: {
          ...state.cart,
          products: inCart
            ? state.cart.products.map((p) =>
                _.isEqual(p.attributes, product.attributes)
                  ? { ...p, qty: p.qty + 1 }
                  : p
              )
            : [...state.cart.products, { ...product, qty: 1, uuid: uuidv4() }],
        },
      };

    case actionTypes.UPDATE_ATTRIBUTES_IN_CART:
      // map over products and update
      const updatedProducts = state.cart.products.map((prod) => {
        if (prod.uuid === action.payload.product.uuid) {
          return action.payload.product;
        } else {
          return prod;
        }
      });

      // Update attributes
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [...updatedProducts],
        },
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            // (p) => !_.isEqual(p, action.payload.product)
            (p) => p.uuid !== action.payload.product.uuid
          ),
        },
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map((p) =>
            _.isEqual(p, action.payload.product)
              ? { ...p, qty: action.payload.qty }
              : p
          ),
        },
      };
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
