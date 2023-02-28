import { request } from './index'

const AUTH_API = '/auth'

export function login(data) {
    return request({ url: AUTH_API + '/login', options: { method: 'POST', body: JSON.stringify({ data }) } })
}

export function register(data) {
    return request({ url: AUTH_API + '/register', options: { method: 'POST', body: JSON.stringify({ data }) } })
}

export function logout(data) {
    return request({ url: AUTH_API + '/logout', options: { method: 'POST', body: JSON.stringify({ data }) } })
}

export function token(data) {
    return request({ url: AUTH_API + '/token', options: { method: 'POST', body: JSON.stringify({ data }) } })
}


// password

export function passwordReset(data) {
    return request({ url: 'password-reset', options: { method: 'POST', body: JSON.stringify({ data }) } })
}

// https://norma.nomoreparties.space/api/password-reset.
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 