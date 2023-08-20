import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axiosInstance from "../../services/Axios";

const initialState = {
  similarBrand: [],
  status: "idle",
  error: null,
};

export const fetchSimilarBrand = createAsyncThunk(
  "similarBrand/fetchSimilarBrand",
  async (value) => {
    try {//TODO change to slice function
      const response = await axiosInstance.get(`products?brand=${value}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const SameBrandSlice = createSlice({
  name: "similarBrand",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSimilarBrand.fulfilled, (state, action) => {
      state.status = "success";
      state.similarBrand = state.similarBrand.concat(action.payload);
    });
  },
});
export const sameItems = (state) => state.similarBrand.similarBrand;
export const requestStatus = (state) => state.similarBrand.status;
export default SameBrandSlice.reducer;
