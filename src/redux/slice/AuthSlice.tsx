import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        loginData: {},
        loginLoading: false,
        loginDataErrorMsg: null,

        accessToken: null
    },
    reducers: {
        loginReq: (state, action) => {
        },
        loginSuccess: (state, action) => {
            state.loginData = action.payload;
            state.loginLoading = false;
            state.loginDataErrorMsg = null;
        },
        loginFailure: (state, action) => {
            state.loginLoading = false;
            state.loginDataErrorMsg = action.payload;
        },
        loginLoading: (state) => {
            state.loginLoading = true
            state.loginDataErrorMsg = null;
        },
        loginClear: (state) => {
            state.loginData = {};
            state.loginLoading = false;
            state.loginDataErrorMsg = null;
        },

        loginAccess: (state, action) => {
            state.accessToken = action.payload;
        },
        loginAccessClear: state => {
            state.accessToken = null
        }
    }
})

export const {
    loginClear,
    loginLoading,
    loginReq,
    loginSuccess,
    loginFailure,

    loginAccess,
    loginAccessClear
} = AuthSlice.actions
export default AuthSlice.reducer