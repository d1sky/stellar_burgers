import { request } from './index'

export function getIngredients() {
    return request({ url: '/ingredients' }).then(res => res.data.map(it => ({ ...it, count: 0 })));
}

export function placeOrder(ingredients) {
    return request({ url: '/orders', options: { method: 'POST', body: JSON.stringify({ ingredients }) } })
}

// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 