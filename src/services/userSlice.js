import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../api/auth-api';
import { setCookie } from '../utils/coockie';


export const fetchRegisterAsync = createAsyncThunk(
    "user/fetchRegisterAsync",
    register
);

const userInitialState = {
    email: ''
}

// const signIn = async form => {
//     const data = await loginRequest(form)
//         .then(res => {
//             let authToken;

//             res.headers.forEach(header => {
//                 if (header.indexOf('Bearer') === 0) {
//                     authToken = header.split('Bearer ')[1];
//                 }
//             });

//             if (authToken) {
//                 setCookie('token', authToken);
//             }

//             return res.json();
//         })
//         .then(data => data);

//     if (data.success) {
//         setUser({ ...data.user, id: data.user._id });
//     }
// };

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegisterAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                // {
                //     "success": true,
                //     "user": {
                //         "email": "",
                //         "name": ""
                //     },
                //     "accessToken": "Bearer ...",
                //     "refreshToken": ""
                //   } 

                let authToken;

                // action.payload.headers.forEach(header => {
                //     if (header.indexOf('Bearer') === 0) {
                //         authToken = header.split('Bearer ')[1];
                //     }
                // });

                if (authToken) {
                    setCookie('token', action.payload.accessToken.split('Bearer ')[1]);
                }

                // state.name = action.payload.name;
                // state.number = action.payload.order?.number;
            });
    },
})


export default userSlice.reducer