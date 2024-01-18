import { sendLogin } from "../../../helpers/api";
import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../helper";
import {IUserData, TUserLogin} from "../../../helpers/types";
import { AppDispatch } from "../../store";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const requestAction = () => actionCreator(LOGIN_REQUEST);
const successAction = (payload: IUserData) => actionPayloadCreator(LOGIN_SUCCESS, payload);
const failedAction = (error: string) => actionErrorCreator(LOGIN_FAILED, error);

export const loginUser = (data: TUserLogin) => {
    return (dispatch: AppDispatch) => {
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