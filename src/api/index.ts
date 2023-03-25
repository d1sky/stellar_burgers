const NORMA_API = 'https://norma.nomoreparties.space/api'

const config: {headers: {'Accept': string; 'Content-Type': string;}} = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

type TRequest = {
    url: string; 
    options?: {
        method?: string;
        body?: string;
        authorization?: string;
        headers?: {
            "Content-Type"?: string;
            authorization?: string;
        }
    }
}

export function request({ url, options }: TRequest): Promise<any> {
    return fetch(NORMA_API + url, { ...config, ...options }).then(checkResponse);
}

const checkResponse = (res: Response  ) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};