import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemOffset: 0,
  pageCount: 0,
  currentItems: [],
};

const PaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updateItems(state, action) {
      console.log("working");
    },
    updatePageCount(state, action) {
      const count = action.payload;
      if (count) {
        state.pageCount = count;
      }
    },
    updateCurrentItems(state, action) {
      const posts = action.payload;
      if (posts) {
        state.currentItems = posts;
      }
    },
  },
});

export const items = (state) => state.pagination.itemOffset;
export const pages = (state) => state.pagination.pageCount;
export const currentPosts = (state) => state.pagination.currentItems;
export const { updateItems, updatePageCount, updateCurrentItems } =
  PaginationSlice.actions;
export default PaginationSlice.reducer;
