import { sendResetPassword } from "../../../../helpers/api";
import { IPasswordData } from "../../../../helpers/types";
import { AppDispatch } from "../../../store/store";
import * as actions from "./reset-password-action-creators";
import { InferValueTypes } from "../../helper";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export type TResetPasswordActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const resetPassword = (data: IPasswordData) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        sendResetPassword(data)
            .then((response) => {
                dispatch(actions.successAction())
            })
            .catch(() => {
                dispatch(actions.failedAction())
            })
    }
}