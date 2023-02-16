import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../api/burger-api';

// cписок всех полученных ингредиентов
// const ingredientList = (state = [], action) => { return state }

export const fetchIngredientListAsync = createAsyncThunk(
    'ingredientList/fetchIngredientListAsync',
    async () => {
        const data = await getIngredients()
        return data
    }
);

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        entities: [],
        status: 'idle',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIngredientListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.entities = action.payload;
            });
    },
})

export const getIngredientList = (state) => state.ingredientList.entities;

export default ingredientListSlice.reducer