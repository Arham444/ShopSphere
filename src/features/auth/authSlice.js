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
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
