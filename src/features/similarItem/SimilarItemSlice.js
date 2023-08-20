import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axiosInstance from "../../services/Axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (value) => {
    try {
      const response = await axiosInstance.get(`products?ram=${value}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const SimilarItemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = "success";
      state.items = state.items.concat(action.payload);
    });
  },
});
export const similar = (state) => state.items.items;
export const requestStatus = (state) => state.items.status;
export default SimilarItemSlice.reducer;
