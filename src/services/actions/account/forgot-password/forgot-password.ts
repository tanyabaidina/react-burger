import { sendForgotPassword } from "../../../../helpers/api";
import { TForgotPassword } from "../../../../helpers/types";
import { AppDispatch } from "../../../store/store";
import * as actions from "./forgot-password-action-creators";
import { InferValueTypes } from "../../helper";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export type TForgotPasswordActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const forgotPassword = (data: TForgotPassword) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        sendForgotPassword(data)
            .then((response) => {
                dispatch(actions.successAction())
            })
            .catch(() => {
                dispatch(actions.failedAction())
            })
    }
}