import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/Axios";
const CART_URL = "cart";
const cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
const initialState = {
  cart: cartItem,
  count: 1,
  status: "idle",
  error: null,
};

export const addCartItems = createAsyncThunk(
  "cart/addCartItems",
  async (initialCartItems) => {
    const res = await axiosInstance.post(CART_URL, initialCartItems);
    return res.data;
  }
);
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newCart = [...state.cart];
      const cartItem = action.payload;
      let products = newCart.find((item) => item.id === cartItem.id);
      if (products) {
        products.count++;
      } else {
        products = { ...cartItem, count: state.count };
        newCart.push(products);
      }
      state.cart = newCart;
    },
    setQuantity: (state, action) => {
      let newCart = [...state.cart];
      const { test } = action.payload;
      const { products } = action.payload;
      let check = (newCart.find(
        (product) => product.id === products.id,
        0
      ).count = test);
      if (check) {
        state.cart = newCart;
      }
    },
    addQuantity: (state, action) => {
      let newCart = [...state.cart];
      const item = action.payload;
      let check = newCart.find((product) => product.id === item.id);
      if (check) {
        check.count++;
      }
      state.cart = newCart;
    },
    reduceQuantity: (state, action) => {
      let newCart = [...state.cart];
      const item = action.payload;
      let check = newCart.find((product) => product.id === item.id);
      if (check.count === 1) {
        check.count = 1;
      } else {
        check.count--;
      }
      state.cart = newCart;
    },
    removeSingleProduct: (state, action) => {
      let check = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = check;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(addCartItems.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = state.cart.concat(action.payload);
    });
  },
});

export const cartItems = (state) => state.cart.cart;
export const count = (state) => state.cart.count;
export const {
  addToCart,
  setQuantity,
  addQuantity,
  reduceQuantity,
  removeSingleProduct,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
