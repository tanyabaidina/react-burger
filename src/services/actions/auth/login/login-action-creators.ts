import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../../helper";
import { IUserData } from "../../../../helpers/types";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "./login";

export const requestAction = () => actionCreator(LOGIN_REQUEST);
export const successAction = (payload: IUserData) => actionPayloadCreator(LOGIN_SUCCESS, payload);
export const failedAction = (error: string) => actionErrorCreator(LOGIN_FAILED, error);