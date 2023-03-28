import { TIngredientTypes } from '../model/ingrediaents';
import { request, TResponse } from './index'


export function getIngredients(): Promise<TResponse> | Promise<Array<TIngredientTypes>> {
    return request({ url: '/ingredients' })
        .then(res => res.data!.map((ingredient: TIngredientTypes) => ({ ...ingredient, count: 0 })));
}

export function placeOrder(ingredients: Array<string>) {
    return request({ url: '/orders', options: { method: 'POST', body: JSON.stringify({ ingredients }) } })
}