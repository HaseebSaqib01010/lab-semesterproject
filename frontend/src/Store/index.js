import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      state.isLoggedIn = false;
    },
  },
});

export const actions = slice.actions;

export const store = configureStore({
  reducer: slice.reducer,
});
