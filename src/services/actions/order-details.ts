import { getOrderDetailsData } from "../../helpers/api";
import { clearConstructorAction } from "./burger-constructor";
import {actionCreator, IActionCreator} from "./helper";
import { IIngredient } from "../../helpers/types";
import { AppDispatch } from "../store";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export interface IOrderAction extends IActionCreator {
    order: number
}

const requestAction = () => actionCreator(GET_ORDER_DETAILS_REQUEST);
const successAction = (payload: number): IOrderAction => (
    {...actionCreator(GET_ORDER_DETAILS_SUCCESS), order: payload}
)
const failedAction = () => actionCreator(GET_ORDER_DETAILS_FAILED);


export const getOrderDetails = (data: string[]) => {
    return (dispatch: AppDispatch) => {
        dispatch(requestAction());
        getOrderDetailsData(data)
            .then((response) => {
                    dispatch(successAction(response.order.number))
                    dispatch(clearConstructorAction())
            })
            .catch(() => {
                dispatch(failedAction())
            })
    }
}