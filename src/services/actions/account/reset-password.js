import {sendResetPassword} from "../../../helpers/api";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const resetPassword = (data) => {
    return (dispatch) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        sendResetPassword(data)
            .then((response) => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            })
    }
}