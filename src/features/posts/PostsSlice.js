//TOP LEVEL IMPORTS

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/Axios";

const editFromStorage = JSON.parse(
  localStorage.getItem("updated post" || "[]")
);
//OUR INITIAL STATE
const initialState = {
  posts: [],
  post: [],
  updatedPost: [editFromStorage],
  status: "idle", //LOADING // FULFILLED // ERROR //
  error: null,
};

export const filterByBrand = createAsyncThunk(
  "posts/filterByBrand",
  async (filterKey) => {
    try {
      const response = await axiosInstance.get(`products?brand=${filterKey}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const softwareFilter = createAsyncThunk(
  "posts/softwareFilter",
  async (software) => {
    try {
      const response = await axiosInstance.get(`products?software=${software}`);
      return (await response).data;
    } catch (error) {
      return error.message;
    }
  }
);

export const searchProducts = createAsyncThunk(
  "posts/searchProducts",
  async (value) => {
    try {
      const response = await axiosInstance.get(`products?q=${value}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const filterYear = createAsyncThunk(
  "posts/yearFilter",
  async (filterKey) => {
    try {
      const response = await axiosInstance.get(`products?year=${filterKey}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const filterById = createAsyncThunk(
  "posts/filterById",
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
  "posts/filterByRam",
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
  "posts/addPostItems",
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

export const editPost = createAsyncThunk("posts/editPost", async (post) => {
  try {
    const response = await axiosInstance.put(`products/${post.id}`, post);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

//THIS IS THE posts SLICE
const ProductsSlice = createSlice({
  name: "posts",
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
    updateProduct(state, action) {
      let newPost = [...state.post];
      const data = action.payload[0];
      const currentData = JSON.parse(data.images);
      let test = { ...data, images: currentData };
      console.log(test);

      state.posts = data;
    },
  },
  //ASYNC CALLS REDUCERS
  extraReducers(builder) {
    builder
      //GET REDUCER

      .addCase(searchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      })

      //POST REDUCER

      .addCase(addProducts.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(addProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.push(action.payload);
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //FILTER REDUCERS
      //FILTER BY SOFTWARE REDUCER
      .addCase(softwareFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      })

      //FILTER BY YEAR REDUCER
      .addCase(filterYear.fulfilled, (state, action) => {
        state.status = "success";
        state.year = state.year.concat(action.payload);
      })

      //FILTER BY BRAND REDUCER
      .addCase(filterByBrand.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterByBrand.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(filterByBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //FILTER BY ID REDUCER
      .addCase(filterById.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = state.posts.concat(action.payload);
      });
  },
});
//PRODUCTS SLICE EXPORTS
export const singlePost = (state) => state.posts.posts;
export const productsError = (state) => state.posts.error;
export const allPosts = (state) => state.posts.products;
export const byYear = (state) => state.posts.year;
export const singleItem = (state) => state.posts.posts[0];
export const imagess = (state) => state.posts.posts[0];
export const posts = (state) => state.posts.updatedPost[0];
export const similarItems = (state) => state.posts.similarItem;
export const productsStatus = (state) => state.posts.status;
export const productsById = (state, productId) =>
  state.posts.posts.find((product) => product.id === productId);
export const byContent = (state, content) =>
  state.posts.posts.filter((product) => product.content === content);
export const filterByPrice = (state, minPrice, maxPrice) =>
  state.posts.posts.filter(
    //our price is greater or equal to current price and less than or equal to current price
    (posts) => posts.price >= minPrice && posts.price <= maxPrice
  );

export const { updatePost, updateProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;
