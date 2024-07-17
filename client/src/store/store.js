import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    userSignIn(state, payload) {
      console.log(payload);
      return payload;
    },
    userSignOut(state, payload) {
      return payload;
    },
  },
});

export const { userSignIn, userSignOut } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
