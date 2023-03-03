import { getCookie } from '../utils/coockie'
import { request } from './index'

const AUTH_API = '/auth'

export function login(data) {
    return request({ url: AUTH_API + '/login', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

export function register(userData) {
    return request({
        url: AUTH_API + '/register', options: {
            method: 'POST', body: JSON.stringify(userData)
        }
    })
}

export function logout(data) {
    return request({ url: AUTH_API + '/logout', options: { method: 'POST', body: JSON.stringify({token: getCookie('refreshToken')}) } })
}

export function token(data) {
    return request({ url: AUTH_API + '/token', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

// user

// GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
// PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.

export function getUserData() {
    return request({ url: AUTH_API + '/user' + '?authorization=' + getCookie('refreshToken'), options: { method: 'GET' }})
}

export function updateUserData(data) {
    return request({ url: AUTH_API + '/user', options: { method: 'POST', body: JSON.stringify({authorization: getCookie('token'),  ...data }) } })
}

// password

export function passwordReset(data) {
    return request({ url: '/password-reset', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

export function passwordResetConfirm(data) {
    return request({ url: '/password-reset/reset', options: { method: 'POST', body: JSON.stringify({ ...data, token: data.code }) } } )
}



// https://norma.nomoreparties.space/api/password-reset
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 