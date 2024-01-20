import { actionCreator, actionPayloadCreator } from "../../helper";
import { IUserData } from "../../../../helpers/types";
import {
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_FAILED,
    USER_REQUEST,
    USER_SUCCESS
} from "./user";

export const requestAction = () => actionCreator(USER_REQUEST);
export const successAction = (payload: IUserData) => actionPayloadCreator(USER_SUCCESS, payload);
export const failedAction = () => actionCreator(USER_FAILED);

export const requestUpdateUserAction = () => actionCreator(UPDATE_USER_REQUEST);
export const successUpdateUserAction = (payload: IUserData) => actionPayloadCreator(UPDATE_USER_SUCCESS, payload);
export const failedUpdateUserAction = () => actionCreator(UPDATE_USER_FAILED);