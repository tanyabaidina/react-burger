import {sendRegister} from "../../../helpers/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const registerUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        sendRegister(data)
            .then((response) => {
                dispatch({
                    type: REGISTER_SUCCESS
                })
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_FAILED
                })
            })
    }
}