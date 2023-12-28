import axios from 'axios';
import { API_URL } from "./constants";
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, removeToken, setToken } from "./tokens";

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
                const response = await refreshAccessToken();
                saveTokens(response)
                originalRequest.headers.Authorization = `Bearer ${getToken(ACCESS_TOKEN)}`;
                return axios(originalRequest);
            } catch (error) {

            }
        }
        return Promise.reject(error);
    }
);

const getRequest = async (url: string, config = {}) => {
    const response = await axios.get(url, config);
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
}

const postRequest = async (url: string, data: any) => {
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

const saveTokens = (response: any) => {
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

export const getIngredientsData = async () => {
    return await getRequest(`${API_URL}/ingredients`);
};

export const getOrderDetailsData = async (data: any) => {
    return await postRequest(`${API_URL}/orders`, {ingredients: data});
}

export const sendForgotPassword = async (data: any) => {
    await postRequest(`${API_URL}/password-reset`, data);
}

export const sendResetPassword = async (data: any) => {
    await postRequest(`${API_URL}/password-reset/reset`, data);
}

export const sendLogin = async(data:any) => {
    return await postRequest(`${API_URL}/auth/login`, data).then(saveTokens);
}

export const sendLogout = async() => {
    await postRequest(`${API_URL}/auth/logout`, { token: getToken(REFRESH_TOKEN)}).then(removeToken);
}

export const sendRegister = async (data:any)=> {
    return await postRequest(`${API_URL}/auth/register`, data).then(saveTokens);
}

export const refreshAccessToken = async() => {
    return await postRequest(`${API_URL}/auth/token`, { token: getToken(REFRESH_TOKEN)})
}

export const getUserData = async() => {
    return await authApi.get("/user");
}

export const patchUserData = async(data:any) => {
    return await authApi.patch("/user", {...data});
}

