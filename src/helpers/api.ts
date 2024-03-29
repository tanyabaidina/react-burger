import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from "./constants";
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, removeToken, setToken } from "./tokens";
import {
    IPasswordData,
    IUserData,
    IAuthResponse,
    TForgotPassword,
    IIngredientsResponse,
    IRefreshTokenResponse,
    TUserLogin,
    IResponse,
    IApiResponse,
    TTokenRequest,
    IOrderDataResponse
} from "./types";

const authApi = axios.create({
    baseURL: `${API_URL}/auth`,
});

authApi.interceptors.request.use(
    (config) => {
        const token = getToken(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.data.message === "jwt expired" && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${getToken(ACCESS_TOKEN)}`;
                return axios(originalRequest);
            } catch (error) {

            }
        }
        return Promise.reject(error);
    }
);

const getRequest = async <T extends IResponse>(url: string, config: AxiosRequestConfig = {}) : Promise<T> => {
    const response = await axios.get<T>(url, config);
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
}

const postRequest = async <U, T extends IResponse>(url: string, data: U): Promise<T> => {
    const response = await axios.post(
        url,
        {...data},
        {
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        });
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
}

export const saveTokens = <T extends IRefreshTokenResponse>(response: T) => {
    if (ACCESS_TOKEN in response) {
        const token = response.accessToken.split("Bearer ")[1];
        token && setToken(ACCESS_TOKEN, token);
    }
    if (REFRESH_TOKEN in response) {
        const token = response.refreshToken;
        token && setToken(REFRESH_TOKEN, token);
    }
    return response;
}

export const getIngredientsData = async (): Promise<IIngredientsResponse> => {
    return await getRequest<IIngredientsResponse>(`${API_URL}/ingredients`);
};

export const getOrderDetailsData = async (data: string[]) => {
    return await authApi.post(`${API_URL}/orders`, {ingredients: data});
}

export const sendForgotPassword = async (data: TForgotPassword) => {
    await postRequest<TForgotPassword, IApiResponse>(`${API_URL}/password-reset`, data);
}

export const sendResetPassword = async (data: IPasswordData) => {
    await postRequest<IPasswordData, IApiResponse>(`${API_URL}/password-reset/reset`, data);
}

export const sendLogin = async(data: TUserLogin) : Promise<IAuthResponse>  => {
    return await postRequest<TUserLogin, IAuthResponse>(`${API_URL}/auth/login`, data)
        .then(saveTokens);
}

export const sendLogout = async() => {
    await postRequest<TTokenRequest, IApiResponse>(`${API_URL}/auth/logout`, {token: getToken(REFRESH_TOKEN)})
        .then(removeToken);
}

export const sendRegister = async (data: IUserData) : Promise<IAuthResponse>  => {
    return await postRequest<IUserData, IAuthResponse>(`${API_URL}/auth/register`, data)
        .then(saveTokens);
}

export const refreshAccessToken = async() : Promise<IRefreshTokenResponse>  => {
    return await postRequest<TTokenRequest, IRefreshTokenResponse>(`${API_URL}/auth/token`, {token: getToken(REFRESH_TOKEN)})
        .then(saveTokens);
}

export const getUserData = async() => {
    return await authApi.get("/user");
}

export const patchUserData = async(data: IUserData) => {
    return await authApi.patch("/user", {...data});
}

export const getOrderById = async(id: string) => {
    return await getRequest<IOrderDataResponse>(`${API_URL}/orders/${id}`)
}