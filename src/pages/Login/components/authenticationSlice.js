import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false
    },
    reducers: {
        login: state => {
            state.isLogged = true
        },
        logout: state => {
            state.isLogged = false
        }
    }
})

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer