import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
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

const initialState = {
    entities: [],
    status: 'idle',
}

export const burgerIngredientListSlice = createSlice({
    name: 'burgerIngredientList',
    initialState,
    reducers: {
        setIngredientList: (state, action) => {
            state.entities = action.payload
        },
        addIngredient: (state, action) => {
            state.entities = [...state.entities, { ...action.payload, id: uuid() }]
        },
        removeIndgredient: (state, action) => {
            console.log();
            state.entities = state.entities.filter(it => it.id !== action.payload)
        },
        swapIngredients: (state, action) => {
            console.log(action.payload);

            let array = state.entities.slice()

            array[action.payload.dragIndex] = array.splice(action.payload.hoverIndex, 1, array[action.payload.dragIndex])[0];

            state.entities = array
        }
    }
})

export const getBurgerIngredientList = (state) => {
    console.log('getBurgerIngredientList', state.burgerIngredientList.entities);

    return state.burgerIngredientList.entities;
}
export const { swapIngredients, addIngredient, removeIndgredient } = burgerIngredientListSlice.actions

export default burgerIngredientListSlice.reducer