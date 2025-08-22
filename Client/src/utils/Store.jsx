import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const store = configureStore({
    reducer: {
    userdata:userReducer
    }
})

export default store