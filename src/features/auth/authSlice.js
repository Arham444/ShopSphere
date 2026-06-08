import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/localStorage";

const initialState = {
  currentUser: loadState("userSession", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload && action.payload.user) {
        state.currentUser = action.payload.user;
      } else {
        state.currentUser = action.payload;
      }
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
