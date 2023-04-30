import { store } from '../../index';
import { addIngredient, getBurgerIngredientList, removeIndgredient, resetIndgredient, swapIngredients } from './burgerIngredientListSlice';


describe('Burger ingredient list slice', () => {
    const ingredient = {
        "_id": "643d69a5c3f7b9001cfa0943",
        "name": "Соус фирменный Space Sauce",
        "type": "sauce",
        "proteins": 50,
        "fat": 22,
        "carbohydrates": 11,
        "calories": 14,
        "price": 80,
        "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        "__v": 0,
        "count": 0,
    }

    it('Should add ingredient to order', () => {
        store.dispatch(addIngredient(ingredient));
        const { id, ...newIngredient } = getBurgerIngredientList(store.getState())[0]

        expect({
            entities: [ingredient],
        })
            .toEqual({
                entities: [newIngredient],
            });
    });

    it('Should remove ingredient from order', () => {
        const { id } = getBurgerIngredientList(store.getState())[0]

        store.dispatch(removeIndgredient({ id }));

        expect({
            entities: []
        })
            .toEqual({
                entities: getBurgerIngredientList(store.getState()),
            });
    });

    it('Should clear ingredient list in order', () => {
        store.dispatch(addIngredient(ingredient));
        store.dispatch(addIngredient(ingredient));
        store.dispatch(resetIndgredient());

        expect({
            entities: [],
        })
            .toEqual({
                entities: getBurgerIngredientList(store.getState()),
            });
    });

    it('Should swap ingredients in order', () => {
        store.dispatch(addIngredient({ ...ingredient, '_id': 2 }));
        store.dispatch(addIngredient({ ...ingredient, '_id': 1 }));

        let firstIngredient = getBurgerIngredientList(store.getState())[0]
        let secondsIngredient = getBurgerIngredientList(store.getState())[1]

        store.dispatch(swapIngredients({ dragIndex: 0, hoverIndex: 1 }));

        expect({
            entities: [secondsIngredient, firstIngredient],
        })
            .toEqual({
                entities: getBurgerIngredientList(store.getState())
            });
    });

});