export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const setToken = (tokenName: string, token: string) => {
    localStorage.setItem(tokenName, token);
}

export const getToken = (tokenName: string) => {
    return localStorage.getItem(tokenName)
}

export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}