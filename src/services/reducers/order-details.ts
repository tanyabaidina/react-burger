import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED,
    TOrderActionTypes
} from "../actions/order-details/order-details";

interface IOrderDetailsState {
    order: number | null;
    orderDetailsRequest: boolean;
    orderDetailsFailed: boolean
}

export const initialState : IOrderDetailsState = {
    order: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false
}

export const orderDetailsReducer = (state = initialState, action : TOrderActionTypes) : IOrderDetailsState => {
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