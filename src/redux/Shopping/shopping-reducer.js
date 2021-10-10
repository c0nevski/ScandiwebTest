import * as actionTypes from "./shopping-types";

// MOCK PRODUCT DATA
const INITIAL_STATE = {
  categories: [{ name: "clothes" }, { name: "tech" }],
  products: [
    {
      id: "huarache-x-stussy-le",
      name: "Nike Air Huarache Le",
      inStock: true,
      gallery: [
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
      ],
      description: "<p>Great sneakers for everyday use!</p>",
      category: "clothes",
      attributes: [
        {
          id: "Size",
          name: "Size",
          type: "text",
          items: [
            {
              id: "40",
              displayValue: "40",
              value: "40",
            },
            {
              id: "41",
              displayValue: "41",
              value: "41",
            },
            {
              id: "42",
              displayValue: "42",
              value: "42",
            },
            {
              id: "43",
              displayValue: "43",
              value: "43",
            },
          ],
        },
      ],
      prices: [
        {
          currency: "USD",
          amount: 144.69,
        },
        {
          currency: "GBP",
          amount: 104,
        },
        {
          currency: "AUD",
          amount: 186.65,
        },
        {
          currency: "JPY",
          amount: 15625.24,
        },
        {
          currency: "RUB",
          amount: 10941.76,
        },
      ],
      brand: "Nike x Stussy",
    },
    {
      id: "huarache-x-stussy-le2",
      name: "Nike Air Huarache Le 2",
      inStock: true,
      gallery: [
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
      ],
      description: "<p>Great sneakers for everyday use!</p>",
      category: "clothes",
      attributes: [
        {
          id: "Size",
          name: "Size",
          type: "text",
          items: [
            {
              id: "40",
              displayValue: "40",
              value: "40",
            },
            {
              id: "41",
              displayValue: "41",
              value: "41",
            },
            {
              id: "42",
              displayValue: "42",
              value: "42",
            },
            {
              id: "43",
              displayValue: "43",
              value: "43",
            },
          ],
        },
      ],
      prices: [
        {
          currency: "USD",
          amount: 144.69,
        },
        {
          currency: "GBP",
          amount: 104,
        },
        {
          currency: "AUD",
          amount: 186.65,
        },
        {
          currency: "JPY",
          amount: 15625.24,
        },
        {
          currency: "RUB",
          amount: 10941.76,
        },
      ],
      brand: "Nike x Stussy",
    },
    {
      id: "huarache-x-stussy-le3",
      name: "Nike Air Huarache Le 3",
      inStock: true,
      gallery: [
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
      ],
      description: "<p>Great sneakers for everyday use!</p>",
      category: "clothes",
      attributes: [
        {
          id: "Size",
          name: "Size",
          type: "text",
          items: [
            {
              id: "40",
              displayValue: "40",
              value: "40",
            },
            {
              id: "41",
              displayValue: "41",
              value: "41",
            },
            {
              id: "42",
              displayValue: "42",
              value: "42",
            },
            {
              id: "43",
              displayValue: "43",
              value: "43",
            },
          ],
        },
      ],
      prices: [
        {
          currency: "USD",
          amount: 144.69,
        },
        {
          currency: "GBP",
          amount: 104,
        },
        {
          currency: "AUD",
          amount: 186.65,
        },
        {
          currency: "JPY",
          amount: 15625.24,
        },
        {
          currency: "RUB",
          amount: 10941.76,
        },
      ],
      brand: "Nike x Stussy",
    },
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
