import { TUserData } from "../components/profile-form/profile-form";
import { TIngredientTypes } from "../model/ingrediaents";
import { TOrderDetails } from "../services/orderDetailsSlice";

const NORMA_API = 'https://norma.nomoreparties.space/api'

const config: { headers: { 'Accept': string; 'Content-Type': string; } } = {
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

export type TResponse = Response & Array<TIngredientTypes> & {
    data?: Array<TIngredientTypes>
    payload: {
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
} & TOrderDetails

export function request({ url, options }: TRequest): Promise<TResponse> {
    return fetch(NORMA_API + url, { ...config, ...options }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    });
}