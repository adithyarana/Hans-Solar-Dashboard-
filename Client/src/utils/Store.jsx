import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

// Load from localStorage
const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const persistedToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;


const store = configureStore({
    reducer: {
    userdata:userReducer
    },
    preloadedState: {
      userdata: {
        user: persistedUser,
        token: persistedToken,
      },
    },
})

export default store    