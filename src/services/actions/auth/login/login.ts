import { sendLogin } from "../../../../helpers/api";
import { InferValueTypes } from "../../helper";
import { TUserLogin } from "../../../../helpers/types";
import { AppDispatch } from "../../../store/store";
import * as actions from "./login-action-creators"

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export type TLoginActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const loginUser = (data: TUserLogin) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        sendLogin(data)
            .then((response ) => {
                dispatch(actions.successAction(response.user))
            })
            .catch((error) => {
                dispatch(actions.failedAction(error.response.data.message))
            })
    }
}