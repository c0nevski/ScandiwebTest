import * as actionTypes from "./shopping-types";
import _ from "lodash";

// MOCK PRODUCT DATA
const INITIAL_STATE = {
  categories: [],
  products: [],
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
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES_AND_PRODUCTS:
      const cats = action.payload.map((cat) => {
        return { name: cat.name };
      });
      const products = action.payload.map((cat) => cat.products).flat();
      return {
        ...state,
        categories: [...cats],
        products: [...products],
      };
    case actionTypes.SET_CURRENCIES:
      return {
        ...state,
        currency: {
          ...state.currency,
          list: action.payload,
          selectedCurrency: action.payload[0],
        },
      };
    case actionTypes.ADD_TO_CART:
      // Get item from payload
      const product = action.payload;
      // Check if item is already in cart
      const inCart = state.cart.products.find((item) => {
        const equalId = item.id === product.id;
        const equalAttributes = _.isEqual(item.attributes,product.attributes);
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
                _.isEqual(p.attributes, product.attributes) ? { ...p, qty: p.qty + 1 } : p
              )
            : [...state.cart.products, { ...product, qty: 1 }],
        },
      };
    case actionTypes.UPDATE_ATTRIBUTES_IN_CART:
      const updatedCartProducts = state.cart.products.map(prod => {
        if( prod.id === action.payload.id ) {
          return action.payload;
        } else {
          return prod;
        }
      });
      // Update attributes
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [...updatedCartProducts],
        },
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(p => !_.isEqual(p, action.payload.product) ),
        }
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map(p => _.isEqual(p, action.payload.product) ? { ...p, qty: action.payload.qty } : p),
        }
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
