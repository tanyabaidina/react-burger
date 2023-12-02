import { getOrderDetailsData } from "../../helpers/api";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const getOrderDetails = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        });
        getOrderDetailsData(data)
            .then((response) => {
                dispatch({
                    type: GET_ORDER_DETAILS_SUCCESS,
                    order: response.data
                })
            })
            .catch(() => {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED
                })
            })
    }
}