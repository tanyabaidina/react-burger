import { getOrderDetailsData } from "../../../helpers/api";
import { clearConstructorAction } from "../burger-constructor/burger-constructor-action-creators";
import { AppDispatch } from "../../store/store";
import * as actions from "./order-details-action-creators";
import { InferValueTypes } from "../helper";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export type TOrderActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const getOrderDetails = (data: string[]) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        getOrderDetailsData(data)
            .then((response) => {
                    dispatch(actions.successAction(response.order.number))
                    dispatch(clearConstructorAction())
            })
            .catch(() => {
                dispatch(actions.failedAction())
            })
    }
}