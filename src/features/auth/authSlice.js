import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage";

const initialState = {
  currentUser: loadState("userSession", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      saveState("userSession", action.payload);
    },
    logout(state) {
      state.currentUser = null;
      saveState("userSession", null);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
