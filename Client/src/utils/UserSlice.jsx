import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    LoggedInUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // save data sepratly in local storage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    LogoutUser(state) {
      state.user = null;
      state.token = null;

      // remove local storage

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export default userSlice.reducer;
export const { LoggedInUser, LogoutUser } = userSlice.actions;
