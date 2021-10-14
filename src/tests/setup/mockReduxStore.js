import { combineReducers, createStore } from "redux";
import * as actionTypes from "./mockReduxTypes";
import _ from "lodash";

const INITIAL_STATE = {
  categories: [{ name: "clothes" }, { name: "tech" }],
  products: [],
  cart: {
    priceTotal: 0,
    products: [],
    isOpen: false,
  },
  currency: {
    list: ["USD", "EUR", "RUB", "GBP"],
    selectedCurrency: "USD",
    isOpen: false,
  },
  currentItem: null,
};

const mockShopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MOCK_SET_CATEGORIES_AND_PRODUCTS:
      const cats = action.payload.map((cat) => {
        return { name: cat.name };
      });
      const products = action.payload.map((cat) => cat.products).flat();
      return {
        ...state,
        categories: [...cats],
        products: [...products],
      };
    case actionTypes.MOCK_SET_CURRENCIES:
      return {
        ...state,
        currency: {
          ...state.currency,
          list: action.payload,
          selectedCurrency: action.payload[0],
        },
      };
    case actionTypes.MOCK_ADD_TO_CART:
      // Get item from payload
      const product = action.payload;
      // Check if item is already in cart
      const inCart = state.cart.products.find((item) => {
        // product in cart === payload product
        if (item.id === product.id) {
          // product in cart -> attributes === payload product -> attributes
          const payloadProductAttributes = product.attributes.map(
            (att) => att.selectedVal
          );
          const productInCartAttributes = item.attributes.map(
            (att) => att.selectedVal
          );

          const attributesEqual = _.isEqual(
            productInCartAttributes,
            payloadProductAttributes
          );

          if (attributesEqual) {
            return true;
          }
          return false;
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
                p.id === product.id ? { ...p, qty: p.qty + 1 } : p
              )
            : [...state.cart.products, { ...product, qty: 1 }],
        },
      };
    case actionTypes.MOCK_UPDATE_ATTRIBUTES_IN_CART:
      const updatedCartProducts = state.cart.products.map((prod) => {
        if (prod.id === action.payload.id) {
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
    case actionTypes.MOCK_REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            (p) => p.id !== action.payload.id
          ),
        },
      };
    case actionTypes.MOCK_ADJUST_QTY:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map((p) =>
            p.id === action.payload.id ? { ...p, qty: action.payload.qty } : p
          ),
        },
      };
    case actionTypes.MOCK_TOGGLE_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      };
    case actionTypes.MOCK_TOGGLE_CURRENCY:
      return {
        ...state,
        currency: {
          ...state.currency,
          isOpen: !state.currency.isOpen,
        },
      };
    case actionTypes.MOCK_SELECT_CURRENCY:
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

const mockRootReducer = combineReducers({
  shop: mockShopReducer,
});

const mockStore = createStore(mockRootReducer);

export default mockStore;
