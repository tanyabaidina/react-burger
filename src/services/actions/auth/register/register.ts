import { sendRegister } from "../../../../helpers/api";
import { IUserData } from "../../../../helpers/types";
import { AppDispatch } from "../../../store/store";
import * as actions from "./register-action-creators";
import { InferValueTypes } from "../../helper";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export type TRegisterActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const registerUser = (data: IUserData) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        sendRegister(data)
            .then((response) => {
                dispatch(actions.successAction(response.user))
            })
            .catch((error) => {
                dispatch(actions.failedAction(error.response.data.message))
            })
    }
}