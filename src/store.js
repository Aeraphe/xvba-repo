import { configureStore  } from "@reduxjs/toolkit";
import authReducer from './pages/Login/components/authenticationSlice';
export default configureStore({
    reducer:{
        auth:authReducer
    }
})