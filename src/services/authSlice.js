import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserData, updateUserData, login, logout, passwordReset, passwordResetConfirm, register, updateToken } from '../api/auth-api';
import { deleteCookie, getCookie, setCookie } from '../utils/coockie';


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

// export const fetchUpdateTokenAsync = createAsyncThunk(
//     "auth/fetchUpdateTokenAsync",
//     updateToken
// );

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
                    setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', action.payload.refreshToken)

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
                    setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', action.payload.refreshToken)

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

                    state.user = { ...state, user: userInitialState }
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
                } else {
                    if (getCookie('refreshToken')) {
                        updateToken(getCookie('refreshToken')).then(data => {
                            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);

                        })
                    }
                    state.user = userInitialState
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
            ;
    },
})

export const getUser = (state) => state.auth.user;
export const getLoginStatus = (state) => state.auth.status;

export default userSlice.reducer