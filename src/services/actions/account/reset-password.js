import { sendResetPassword } from "../../../helpers/api";
import { actionCreator } from "../helper";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

const requestAction = () => actionCreator(RESET_PASSWORD_REQUEST);
const successAction = () => actionCreator(RESET_PASSWORD_SUCCESS);
const failedAction = () => actionCreator(RESET_PASSWORD_FAILED);

export const resetPassword = (data) => {
    return (dispatch) => {
        dispatch(requestAction());
        sendResetPassword(data)
            .then((response) => {
                dispatch(successAction())
            })
            .catch(() => {
                dispatch(failedAction())
            })
    }
}