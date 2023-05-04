import { store } from '../..';
import { getCookie } from '../../../utils/coockie';
import {
    fetchLoginAsync,
    fetchLogoutAsync,
    fetchRegisterAsync,
    fetchForgotPasswordAsync,
    fetchResetPasswordAsync,
    fetchGetUserDataAsync,
    fetchUpdateUserDataAsync
} from './authSlice';

describe('auth slice', () => {
    const alpha = Array.from(Array(26)).map((_, index) => index + 65);
    const letters = alpha.map(index => String.fromCharCode(index));

    const getRnd = () => {
        const rnd: string[] = [];
        for (let i = 0; i < 10; i++) {
            rnd.push(letters[Math.floor(Math.random() * letters.length)]);
        }
        return rnd.join('').toLowerCase();
    }

    it('Should register', async () => {
        const mockUserData = {
            email: `${getRnd()}@test.com`,
            name: getRnd(),
            password: getRnd()
        };

        await store.dispatch(fetchRegisterAsync(mockUserData));

        expect(store.getState().auth)
            .toEqual({
                user: {
                    name: mockUserData.name,
                    email: mockUserData.email,
                    password: ''
                },
                status: 'idle'
            });
    });

    it('Should log in', async () => {
        const mockUserData = { email: 'godasin@gmail.com', password: '142857' };

        await store.dispatch(fetchLoginAsync(mockUserData));

        expect(store.getState().auth)
            .toEqual({
                user: {
                    name: 'Denis',
                    email: 'godasin@gmail.com',
                    password: ''
                },
                status: 'idle',
            });
    });

    it('Should get user data', async () => {
        await store.dispatch(fetchGetUserDataAsync());

        expect(store.getState().auth)
            .toEqual({
                user: {
                    name: 'Denis',
                    email: 'godasin@gmail.com',
                    password: ''
                },
                status: 'idle',
            });
    });

    it('Should log out', async () => {
        await store.dispatch(fetchLogoutAsync());

        expect(store.getState().auth)
            .toEqual({
                status: 'idle',
                user: {
                    name: '',
                    email: '',
                    password: ''
                }
            });

        expect(getCookie('accessToken')).toBeUndefined();
        expect(getCookie('refreshToken')).toBeUndefined();
    });
});
