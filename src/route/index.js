/*
    / - главная страница, конструктор бургеров.

    /login - страница авторизации.

    /register - страница регистрации.

    /forgot-password - страница восстановления пароля.

    /reset-password - страница сброса пароля.

    /profile — страница с настройками профиля пользователя.

    /ingredients/:id — страница ингредиента. 
*/

import App from "../components/app/app"


export const authRoutes = [
    {
        path: '/profile',
        Component: App
    },
]

export const publicRoutes = [
    {
        path: '/',
        Component: App
    },
    {
        path: '/login',
        Component: Main
    },
    {
        path: '/register',
        Component: Auth
    },
    {
        path: '/forgot-password',
        Component: Auth
    },
    {
        path: '/reset-password',
        Component: Auth
    },
    {
        path: '/ingredients/:id',
        Component: Auth
    }
]
