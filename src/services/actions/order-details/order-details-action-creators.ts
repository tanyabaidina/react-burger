import { actionCreator } from "../helper";
import { GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS } from "./order-details";

export const requestAction = () => actionCreator(GET_ORDER_DETAILS_REQUEST);
export const successAction = (payload: number) => (
    {...actionCreator(GET_ORDER_DETAILS_SUCCESS), order: payload}
)
export const failedAction = () => actionCreator(GET_ORDER_DETAILS_FAILED);