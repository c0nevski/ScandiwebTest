import * as actionTypes from "./shopping-types";

// MOCK PRODUCT DATA
const INITIAL_STATE = {
    products: [
        { id:1, name: "product 1", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:2, name: "product 2", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:3, name: "product 3", price: "$50.00", inStock: false, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:4, name: "product 4", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:5, name: "product 5", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:6, name: "product 6", price: "$50.00", inStock: true, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        { id:7, name: "product 7", price: "$50.00", inStock: false, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" }
    ],
    cart: {
        priceTotal: "$100.00",
        products: [
          { id:7, name: "product 7", price: "$50.00", inStock: true, qty: 1, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
          { id:3, name: "product 3", price: "$50.00", inStock: true, qty: 1, image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image" },
        ],
        isOpen: false,
    },
    currency: {
      currencyList: [{name:'USD', value:'$ USD', symbol: '$'}, {name:'EUR', value:'€ EUR', symbol: '€'}, {name:'JPY', value:'¥ JPY', symbol: '¥'}],
      selectedCurrency: {name:'USD', value:'$ USD', symbol: '$'},
      isOpen: false,
    },
    currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get item from products array
      const item = state.products.find(product => product.id === action.payload.id);
      // Check if item is already in cart
      const inCart = state.cart.products.find(item => item.id === action.payload.id ? true : false);
      // Add item to cart
      return {
        ...state,
        cart: {
          ...state.cart,
          products: inCart
            ? state.cart.products.map(p => p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p)
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
        }
      };
    case actionTypes.TOGGLE_CURRENCY:
      return {
        ...state,
        currency: {
          ...state.currency,
          isOpen: !state.currency.isOpen,
        }
      };
    default:
      return state;
  }
};

export default shopReducer;
