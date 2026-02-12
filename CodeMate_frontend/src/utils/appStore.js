import userReducer from "./userSlice"
import feedReducer from "./feedSlice";
import requestSlice from "./requestSlice";
import {configureStore} from "@reduxjs/toolkit"
const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        request:requestSlice
    }
});
export default appStore;