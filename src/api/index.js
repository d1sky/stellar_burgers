const NORMA_API = 'https://norma.nomoreparties.space/api'

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

export function request({ url, options }) {
    return fetch(NORMA_API + url, { ...config, ...options }).then(checkResponse);
}

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};