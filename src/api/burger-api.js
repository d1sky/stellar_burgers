const NORMA_API = 'https://norma.nomoreparties.space/api'

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

function request({ url, options }) {
    return fetch(NORMA_API + url, { ...config, ...options }).then(checkResponse);
}

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export function getIngredients() {
    return request({ url: '/ingredients' }).then(res => res.data.map(it => ({ ...it, count: 0 })));
}

export function placeOrder(ingredients) {
    return request({ url: '/orders', options: { method: 'POST', body: JSON.stringify({ ingredients }) } })
}

