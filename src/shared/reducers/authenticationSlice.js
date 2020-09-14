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
            handleCheckTokenExpiration(state);
        },
        logout: state => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            state.isLogged = false;
            state.token = undefined;
        }
    }
})


const handleCheckTokenExpiration = (state) => {
    let token = localStorage.getItem('token');
    let expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();

    let timeNow = Date.now();
    if (expirationTime > timeNow) {
        state.isLogged = true;
        state.token = token;
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        state.isLogged = false;
        state.token = undefined;
    }
}

export const { login, logout, checkUserLogged } = authenticationSlice.actions;
export default authenticationSlice.reducer