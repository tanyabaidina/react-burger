import {sendLogin} from "../../../helpers/api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        sendLogin(data)
            .then((response) => {
                console.info(response)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.user
                })
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILED
                })
            })
    }
}