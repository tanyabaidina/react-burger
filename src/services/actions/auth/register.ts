import { sendRegister } from "../../../helpers/api";
import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../helper";
import { IUserData } from "../../../helpers/types";
import { AppDispatch } from "../../store";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

const requestAction = () => actionCreator(REGISTER_REQUEST);
const successAction = (payload: IUserData) => actionPayloadCreator(REGISTER_SUCCESS, payload);
const failedAction = (error: string) => actionErrorCreator(REGISTER_FAILED, error);

export const registerUser = (data: IUserData) => {
    return (dispatch: AppDispatch) => {
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