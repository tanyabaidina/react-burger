import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED
} from "../actions/order-details";

export const initialState = {
    order: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false
}

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderDetailsRequest: true
            }
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderDetailsRequest: false,
                orderDetailsFailed: false
            }
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                order: null,
                orderDetailsRequest: false,
                orderDetailsFailed: true
            }
        }
        default: {
            return state;
        }
    }
}