import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        token: undefined
    },
    reducers: {
        login: (state, data) => {
            const { token, expirationTime } = data.payload
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('expirationTime', expirationTime);
                state.isLogged = true
            }

        },
        checkUserLogged: (state) => {
            let token = localStorage.getItem('token');
            if (token) {
                state.isLogged = true;
                state.token = token;
            } else {
                state.isLogged = false;
                state.token = undefined;
            }
        },
        logout: state => {
            state.isLogged = false
        }
    }
})

export const { login, logout,checkUserLogged } = authenticationSlice.actions;
export default authenticationSlice.reducer