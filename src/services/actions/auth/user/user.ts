import { getUserData, patchUserData } from "../../../../helpers/api";
import { InferValueTypes } from "../../helper";
import { IUserData } from "../../../../helpers/types";
import { AppDispatch } from "../../../store/store";
import * as actions from './user-action-creators'

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export type TUserActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const userData = () => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        getUserData()
            .then((response) => {
                dispatch(actions.successAction(response.data.user))
            })
            .catch(() => {
                dispatch(actions.failedAction())
            })
    }
}

export const updateUserData = (data: IUserData) => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestUpdateUserAction());
        patchUserData(data)
            .then((response) => {
                dispatch(actions.successUpdateUserAction(response.data.user))
            })
            .catch(() => {
                dispatch(actions.failedUpdateUserAction())
            })
    }
}