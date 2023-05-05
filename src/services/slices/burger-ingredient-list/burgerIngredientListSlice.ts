import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { TIngredientTypes } from '../../../model/ingrediaents';

type TOrderIngredientList = {
    entities: Array<TIngredientTypes>,
    status: string,
};

const burgerIngredientListInitialState: TOrderIngredientList = {
    entities: [],
    status: ''
}

export const burgerIngredientListSlice = createSlice({
    name: 'burgerIngredientList',
    initialState: burgerIngredientListInitialState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun' && state.entities.find(ingredient => ingredient.type === 'bun')) {
                state.entities = state.entities.map(ingredient => (ingredient.type === 'bun') ? action.payload : ingredient)
            } else {
                state.entities = action.payload.type === 'bun' ?
                    [...state.entities, { ...action.payload, id: nanoid() }, { ...action.payload, id: nanoid() }] :
                    [...state.entities, { ...action.payload, id: nanoid() }]
            }
        },
        removeIndgredient: (state, action) => {
            state.entities = state.entities.filter(it => it.id !== action.payload.id)
        },
        swapIngredients: (state, action) => {
            let array = state.entities.slice()
            array[action.payload.dragIndex] = array.splice(action.payload.hoverIndex, 1, array[action.payload.dragIndex])[0];
            state.entities = array
        },
        resetIndgredient: (state) => {
            state.entities = []
        },
    }
})

export const getBurgerIngredientList = (state: RootState) => state.burgerIngredientList.entities;
export const { swapIngredients, addIngredient, removeIndgredient, resetIndgredient } = burgerIngredientListSlice.actions

export default burgerIngredientListSlice.reducer