import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register, passwordReset, passwordResetConfirm, getUserData } from '../api/auth-api';
import { setCookie, getCookie, deleteCookie } from '../utils/coockie';


export const fetchLoginAsync = createAsyncThunk(
    "auth/fetchLoginAsync",
    login
);

export const fetchLogoutAsync = createAsyncThunk(
    "auth/fetchLogoutAsync",
    logout
);

export const fetchRegisterAsync = createAsyncThunk(
    "auth/fetchRegisterAsync",
    register
);

export const fetchForgotPasswordAsync = createAsyncThunk(
    "auth/fetchForgotPasswordAsync",
    passwordReset
);

export const fetchResetPasswordAsync = createAsyncThunk(
    "auth/fetchResetPasswordAsync",
    passwordResetConfirm
);


export const fetchGetUserDataAsync = createAsyncThunk(
    "auth/fetchGetUserDataAsync",
    getUserData
);

const userInitialState = {
    user: {
        email: '',
        name: ''
    }
}

export const userSlice = createSlice({
    name: 'auth',
    initialState: userInitialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegisterAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchRegisterAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', action.payload.refreshToken)

                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            .addCase(fetchLogoutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogoutAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchLogoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    deleteCookie('token');
                    deleteCookie('refreshToken')

                    state.user = {...state, user: userInitialState}
                    // state.user.name = null;
                }
            })
            .addCase(fetchGetUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            .addCase(fetchLoginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoginAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchLoginAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', action.payload.refreshToken)

                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            });
    },
})

export const getUser = (state) => state.auth.user;
export const getLoginStatus = (state) => state.auth.status;

export default userSlice.reducer