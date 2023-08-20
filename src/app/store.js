import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/ProductsSlice";
import usersReducer from "../features/users/UsersSlice";
import cartReducer from "../features/cart/CartSlice";

import similarItemReducer from "../features/similarItem/SimilarItemSlice";
import sameBrandReducer from "../features/similarBrand/SameBrandSlice";
export const store = configureStore({
  reducer: {

    products: productsReducer,
    items: similarItemReducer,
    similarBrand: sameBrandReducer,
    users: usersReducer,
    cart: cartReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});
