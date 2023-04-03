/*
    / - главная страница, конструктор бургеров.

    /login - страница авторизации.

    /register - страница регистрации.

    /forgot-password - страница восстановления пароля.

    /reset-password - страница сброса пароля.

    /profile — страница с настройками профиля пользователя.

    /ingredients/:id — страница ингредиента. 
*/

export const MAIN_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const FORGOT_PASSWORD_ROUTE = '/forgot-password'
export const RESET_PASSWORD_ROUTE = '/reset-password'
export const PROFILE_ROUTE = '/profile'
export const PROFILE_ORDERS_ROUTE = PROFILE_ROUTE + '/orders'
export const PROFILE_ORDERS_ID_ROUTE = PROFILE_ORDERS_ROUTE + '/:id'
export const INGREDIENTS_ROUTE = '/ingredients'
export const INGREDIENT_ID_ROUTE = INGREDIENTS_ROUTE + '/:ingredientId'
export const FEED_ROUTE = '/feed'
export const FEED_ID_ROUTE = FEED_ROUTE + '/:id'