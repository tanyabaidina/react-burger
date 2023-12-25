import {sendForgotPassword} from "../../../helpers/api";
import { actionCreator } from "../helper";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

const requestAction = () => actionCreator(FORGOT_PASSWORD_REQUEST);
const successAction = () => actionCreator(FORGOT_PASSWORD_SUCCESS);
const failedAction = () => actionCreator(FORGOT_PASSWORD_FAILED);

export const forgotPassword = (data) => {
    return (dispatch) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        sendForgotPassword(data)
            .then((response) => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            })
    }
}