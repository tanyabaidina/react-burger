import axios from 'axios';
import {API_URL} from "./constants";

export const getIngredientsData = async () => {
    const response = await axios.get(API_URL);
    if (response.data.success) {
        return response.data;
    } else {
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }
};

