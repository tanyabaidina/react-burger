import axios from 'axios';
import {API_URL} from "./constants";

export const getIngredientsData = async () => {
    const response = await axios.get(`${API_URL}/ingredients`);
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
};

export const getOrderDetailsData = async (data: any) => {
    const response = await axios.post(`${API_URL}/orders`, data);
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
}

