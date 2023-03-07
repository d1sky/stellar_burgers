import { getCookie, setCookie } from '../utils/coockie'
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

export function logout() {
    return request({ url: AUTH_API + '/logout', options: { method: 'POST', body: JSON.stringify({ token: getCookie('refreshToken') }) } })
}

export function updateToken(token) {
    request({ url: AUTH_API + '/token', options: { method: 'POST', body: JSON.stringify({ token }) } }).then(data => {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', data.refreshToken)
    })
}


// user

export async function getUserData() {
    return await request({ url: AUTH_API + '/user', options: { method: 'GET', headers: { authorization: 'Bearer ' + getCookie('accessToken') } } })
        .catch((err) => {
            if (err.message === 'jwt expired' && getCookie('refreshToken')) {
                return updateToken(getCookie('refreshToken')).then(() => getUserData())
            }

            return err
        })
}

export async function updateUserData(userData) {
    return await request({
        url: AUTH_API + '/user',
        options: {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify(userData)
        }
    }).catch((err) => {
        if (err.message === 'jwt expired' && getCookie('refreshToken')) {

            return updateToken(getCookie('refreshToken')).then(() => updateUserData(userData))
        }

        return err
    })
}

export function passwordReset(data) {
    return request({ url: '/password-reset', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

export function passwordResetConfirm(data) {
    return request({ url: '/password-reset/reset', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}