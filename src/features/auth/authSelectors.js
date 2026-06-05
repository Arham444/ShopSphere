export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => !!state.auth.currentUser;
export const selectIsAdmin = (state) => state.auth.currentUser?.role === "admin";
