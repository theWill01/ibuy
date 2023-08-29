//TOP LEVEL IMPORTS

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/Axios";

const editFromStorage = JSON.parse(
  localStorage.getItem("updated post" || "[]")
);
//OUR INITIAL STATE
const initialState = {
  products: [],
  updatedPost: [editFromStorage],
  status: "idle", //LOADING // FULFILLED // ERROR //
  error: null,
};

export const filterById = createAsyncThunk(
  "products/filterById",
  async (productId) => {
    try {
      const response = await axiosInstance.get(`products?id=${productId}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const filterByRam = createAsyncThunk(
  "products/filterByRam",
  async (ram) => {
    try {
      const response = await axiosInstance.get(`products?ram=${ram}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

//ADD POST ASYNC REQUEST
export const addProducts = createAsyncThunk(
  "products/addPostItems",
  async (formData) => {
    try {
      const response = await axiosInstance.post("products", formData);
      console.log("request successful");
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editPost = createAsyncThunk("products/editPost", async (post) => {
  try {
    const response = await axiosInstance.put(`products/${post.id}`, post);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

//THIS IS THE products SLICE
const ProductsSlice = createSlice({
  name: "products",
  initialState,
  //STATE REDUCERS
  reducers: {
    updatePost(state, action) {
      let newPost = [...state.updatedPost];
      const post = action.payload;
      let postExists = newPost.find((item) => item.id === post.id);

      if (postExists) {
        postExists = post;
        newPost = postExists;
      }
      localStorage.setItem("updated post", JSON.stringify(newPost));
    },
  },
  //ASYNC CALLS REDUCERS
  extraReducers(builder) {
    builder

      .addCase(addProducts.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(addProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //FILTER REDUCERS

      //FILTER BY ID REDUCER
      .addCase(filterById.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.concat(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.concat(action.payload);
      });
  },
});
//PRODUCTS SLICE EXPORTS
export const productsError = (state) => state.products.error;
export const allProducts = (state) => state.products.products;
export const byYear = (state) => state.products.year;
export const singleItem = (state) => state.products.products[0];
export const imagess = (state) => state.products.products[0];
export const posts = (state) => state.products.updatedPost[0];
export const similarItems = (state) => state.products.similarItem;
export const productsStatus = (state) => state.products.status;
export const productsById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const byContent = (state, content) =>
  state.products.products.filter((product) => product.content === content);
export const filterByPrice = (state, minPrice, maxPrice) =>
  state.products.products.filter(
    //our price is greater or equal to current price and less than or equal to current price
    (products) => products.price >= minPrice && products.price <= maxPrice
  );

export const { updatePost, updateProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;
