import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axiosInstance from "../../services/Axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const getUser = createAsyncThunk("users/getUsers", async (id) => {
  try {
    const response = await axiosInstance.get(`users?id=${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (name) => {
    try {
      const response = await axiosInstance.put('users/1', name);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.push(action.payload);
    },
    updateUsers: (state, action) => {
      const { id, name } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "success";
        state.users = state.users.concat(action.payload);
      })
      ;
  },
});

export const { addUsers, updateUsers } = usersSlice.actions;
export const user = (state) => state.users.users;
export default usersSlice.reducer;
