import {sendLogout} from "../../../helpers/api";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        sendLogout()
            .then(() => {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
    }

}