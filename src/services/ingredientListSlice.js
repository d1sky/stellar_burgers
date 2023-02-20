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
        increment: (state, action) => {
            state.entities = state.entities.map(ingredient => ingredient._id === action.payload.id ? { ...ingredient, count: ingredient?.count + 1 } : ingredient)
        },
        decrement: (state, action) => {
            state.entities = state.entities.map(ingredient => ingredient._id === action.payload.id ? { ...ingredient, count: ingredient?.count - 1 } : ingredient)
        },
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
export const { increment, decrement } = ingredientListSlice.actions

export default ingredientListSlice.reducer