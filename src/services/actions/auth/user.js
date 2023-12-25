import {getUserData, patchUserData} from "../../../helpers/api";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const userData = () => {
    return (dispatch) => {
        dispatch({
            type: USER_REQUEST
        });
        getUserData()
            .then((response) => {
                dispatch({
                    type: USER_SUCCESS,
                    payload: response.data.user
                })
            })
            .catch(() => {
                dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export const updateUserData = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        patchUserData(data)
            .then((response) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: response.data.user
                })
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_USER_FAILED
                })
            })
    }
}