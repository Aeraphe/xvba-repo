import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './shared/reducers/authenticationSlice';
export default configureStore({
    reducer:{
        auth:authReducer
    }
})