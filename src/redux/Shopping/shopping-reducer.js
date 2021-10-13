import * as actionTypes from "./shopping-types";

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
      const cats = action.payload.map(cat => { return {name: cat.name} });
      const products = action.payload.map(cat => cat.products).flat();
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
          }
        };
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
