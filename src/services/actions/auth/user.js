import { getUserData, patchUserData } from "../../../helpers/api";
import { actionCreator, actionPayloadCreator } from "../helper";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

const requestAction = () => actionCreator(USER_REQUEST);
const successAction = (payload) => actionPayloadCreator(USER_SUCCESS, payload);
const failedAction = () => actionCreator(USER_FAILED);

const requestUpdateUserAction = () => actionCreator(UPDATE_USER_REQUEST);
const successUpdateUserAction = (payload) => actionPayloadCreator(UPDATE_USER_SUCCESS, payload);
const failedUpdateUserAction = () => actionCreator(UPDATE_USER_FAILED);

export const userData = () => {
    return (dispatch) => {
        dispatch(requestAction());
        getUserData()
            .then((response) => {
                dispatch(successAction(response.data.user))
            })
            .catch(() => {
                dispatch(failedAction())
            })
    }
}

export const updateUserData = (data) => {
    return (dispatch) => {
        dispatch(requestUpdateUserAction());
        patchUserData(data)
            .then((response) => {
                dispatch(successUpdateUserAction(response.data.user))
            })
            .catch(() => {
                dispatch(failedUpdateUserAction())
            })
    }
}