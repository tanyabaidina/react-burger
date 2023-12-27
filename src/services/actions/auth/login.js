import { sendLogin } from "../../../helpers/api";
import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../helper";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const requestAction = () => actionCreator(LOGIN_REQUEST);
const successAction = (payload) => actionPayloadCreator(LOGIN_SUCCESS, payload);
const failedAction = (error) => actionErrorCreator(LOGIN_FAILED, error);

export const loginUser = (data) => {
    return (dispatch) => {
        dispatch(requestAction());
        sendLogin(data)
            .then((response) => {
                dispatch(successAction(response.user))
            })
            .catch((error) => {
                dispatch(failedAction(error.response.data.message))
            })
    }
}