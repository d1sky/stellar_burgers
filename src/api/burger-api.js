const NORMA_API = 'https://norma.nomoreparties.space/api'

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse)
        .then(res => res.data)
}

export function placeOrder(ingredients) {
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })
    })
        .then(checkResponse)
}

