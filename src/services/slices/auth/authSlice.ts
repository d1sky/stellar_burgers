import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { getUserData, login, logout, passwordReset, passwordResetConfirm, register, updateUserData } from '../../../api/auth-api';
import { deleteCookie, setCookie } from '../../../utils/coockie';


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

export const fetchUpdateUserDataAsync = createAsyncThunk(
    "auth/fetchUpdateUserDataAsync",
    updateUserData
);

type TUser = {
    email: string;
    name: string;
    password: string;
}

const userInitialState: TUser = {
    email: '',
    name: '',
    password: ''
}

const initialState: { user: TUser, status: string } = {
    user: userInitialState,
    status: ''
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            // register
            .addCase(fetchRegisterAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegisterAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchRegisterAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    setCookie('accessToken', action.payload.accessToken!.split('Bearer ')[1], { path: '/' });
                    setCookie('refreshToken', action.payload.refreshToken, { path: '/' })

                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            // login
            .addCase(fetchLoginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoginAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchLoginAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    setCookie('accessToken', action.payload.accessToken!.split('Bearer ')[1], { path: '/' });
                    setCookie('refreshToken', action.payload.refreshToken, { path: '/' })

                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            // logout
            .addCase(fetchLogoutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogoutAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchLogoutAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    deleteCookie('accessToken');
                    deleteCookie('refreshToken')

                    state.user = userInitialState
                }
            })
            // get user data
            .addCase(fetchGetUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetUserDataAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchGetUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            // update user data
            .addCase(fetchUpdateUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpdateUserDataAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchUpdateUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.success) {
                    state.user.email = action.payload.user.email;
                    state.user.name = action.payload.user.name;
                }
            })
            // forgot password
            .addCase(fetchForgotPasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForgotPasswordAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchForgotPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            // reset password
            .addCase(fetchResetPasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchResetPasswordAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(fetchResetPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            });
    },
    reducers: {}
})

export const getUser = (state: RootState) => state.auth.user;
export const getLoadStatus = (state: RootState) => state.auth.status;

export default userSlice.reducer