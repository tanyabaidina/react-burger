import { sendLogout } from "../../../helpers/api";
import { actionCreator } from "../helper";
import { AppDispatch } from "../../store";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

const requestAction = () => actionCreator(LOGOUT_REQUEST);
const successAction = () => actionCreator(LOGOUT_SUCCESS);
const failedAction = () => actionCreator(LOGOUT_FAILED);

export const userLogout = () => {
    return (dispatch : AppDispatch) => {
        dispatch(requestAction());
        sendLogout()
            .then(() => {
                dispatch(successAction())
            })
            .catch(() => {
                dispatch(failedAction())
            })
    }
}