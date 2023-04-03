import { TUserData } from '../components/profile-form/profile-form'
import { TIngredientTypes } from '../model/ingrediaents'
import { TPasswordResetData } from '../pages/forgot-password/forgot-password'
import { TLoginData } from '../pages/login/login'
import { TRegisterData } from '../pages/register/register'
import { TPasswordConfirmData } from '../pages/reset-password/reset-password'
import { getCookie, setCookie } from '../utils/coockie'
import { request } from './index'

const AUTH_API = '/auth'

export type TResponse = Response & {
    data?: Array<TIngredientTypes>
    payload?: {
        success: boolean;
    };
    success: boolean;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    order: {
        number: number;
    };
    user: TUserData;
    ok: boolean;
}



export function login(data: TLoginData): Promise<TResponse> {
    return request({ url: AUTH_API + '/login', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

export function register(userData: TRegisterData): Promise<TResponse> {
    return request({
        url: AUTH_API + '/register', options: {
            method: 'POST', body: JSON.stringify(userData)
        }
    })
}

export function logout(): Promise<TResponse> {
    return request({ url: AUTH_API + '/logout', options: { method: 'POST', body: JSON.stringify({ token: getCookie('refreshToken') }) } })
}

export function updateToken(): Promise<void | TResponse> {
    return request({ url: AUTH_API + '/token', options: { method: 'POST', body: JSON.stringify({ token: getCookie('refreshToken') }) } })
        .then((data) => {
            setCookie('accessToken', data.accessToken?.split('Bearer ')[1]);
            setCookie('refreshToken', data.refreshToken)
        })
}


// user

export async function getUserData(): Promise<{ user: TUserData, success: boolean }> {

    return await request({ url: AUTH_API + '/user', options: { method: 'GET', headers: { authorization: 'Bearer ' + getCookie('accessToken') } } })
        .catch((err) => {
            if (err.message === 'jwt expired' && getCookie('refreshToken')) {
                return updateToken().then(() => getUserData())
            }

            return err
        })
}

export async function updateUserData(userData: TUserData): Promise<TResponse> {
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
            return updateToken().then(() => getUserData())
        }

        return err
    })
}

export function passwordReset(data: TPasswordResetData): Promise<TResponse> {
    return request({ url: '/password-reset', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}

export function passwordResetConfirm(data: TPasswordConfirmData): Promise<TResponse> {
    return request({ url: '/password-reset/reset', options: { method: 'POST', body: JSON.stringify({ ...data }) } })
}