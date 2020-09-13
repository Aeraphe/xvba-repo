import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './shared/reducers/authenticationSlice';
import userPackagesReducer from "./shared/reducers/user-packages.slice";
export default configureStore({
    reducer:{
        auth:authReducer,
        user_packages:userPackagesReducer
    }
})