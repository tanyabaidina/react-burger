import { sendLogout } from "../../../../helpers/api";
import { AppDispatch } from "../../../store/store";
import * as actions from './logout-action-creators'
import { InferValueTypes } from "../../helper";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export type TLogoutActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const userLogout = () => {
    return (dispatch : AppDispatch) => {
        dispatch(actions.requestAction());
        sendLogout()
            .then(() => {
                dispatch(actions.successAction())
            })
            .catch(() => {
                dispatch(actions.failedAction())
            })
    }
}