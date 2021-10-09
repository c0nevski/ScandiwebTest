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
        itemsQty: 0,
        priceTotal: 0,
        products: [],
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
      return {};
    case actionTypes.REMOVE_FROM_CART:
      return {};
    case actionTypes.ADJUST_QTY:
      return {};
    case actionTypes.LOAD_CURRENT_ITEM:
      return {};
    default:
      return state;
  }
};

export default shopReducer;
