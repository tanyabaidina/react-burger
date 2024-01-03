import { sendRegister } from "../../../helpers/api";
import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../helper";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

const requestAction = () => actionCreator(REGISTER_REQUEST);
const successAction = (payload) => actionPayloadCreator(REGISTER_SUCCESS, payload);
const failedAction = (error) => actionErrorCreator(REGISTER_FAILED, error);

export const registerUser = (data) => {
    return (dispatch) => {
        dispatch(requestAction());
        sendRegister(data)
            .then((response) => {
                dispatch(successAction(response.user))
            })
            .catch((error) => {
                dispatch(failedAction(error.response.data.message))
            })
    }
}