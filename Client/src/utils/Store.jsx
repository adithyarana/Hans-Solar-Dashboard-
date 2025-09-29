import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

// Load from localStorage with better error handling
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== 'undefined' ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

const persistedUser = getStoredUser();
const persistedToken = localStorage.getItem("token") || null;

const store = configureStore({
    reducer: {
    userdata:userReducer
    },
    preloadedState: {   // after refrsh data is gone from store from local strorege data is pushed in store 
      userdata: {
        user: persistedUser,
        token: persistedToken,
      },
    },
})

export default store    