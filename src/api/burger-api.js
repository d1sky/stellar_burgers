const NORMA_API = 'https://norma.nomoreparties.space/api'

const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

async function request({ url, options }) {
    const res = await fetch(NORMA_API + url, { ...config, ...options })
        .catch((error) => {
            console.log(error)
        });
    return checkResponse(res)
}

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export function getIngredients() {
    return request({ url: '/ingredients' }).then(res => res.data);
}

export function placeOrder(ingredients) {
    return request({ url: '/orders', options: { method: 'POST', body: JSON.stringify({ ingredients }) } })
}

