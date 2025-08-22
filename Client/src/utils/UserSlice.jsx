import { createSlice } from "@reduxjs/toolkit";

const Saveduserdata = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null, token: null};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: Saveduserdata,
  },
  reducers: {
    LoggedInUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // updata local storage

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },
    LogoutUser(state) {
      state.user = null;
      state.token = null;

      // remove local storage

      localStorage.removeItem("user");
    },
  },
});

export default userSlice.reducer;
export const { LoggedInUser, LogoutUser } = userSlice.actions;
