import { actionCreator, actionErrorCreator, actionPayloadCreator } from "../../helper";
import { IUserData } from "../../../../helpers/types";
import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "./register";

export const requestAction = () => actionCreator(REGISTER_REQUEST);
export const successAction = (payload: IUserData) => actionPayloadCreator(REGISTER_SUCCESS, payload);
export const failedAction = (error: string) => actionErrorCreator(REGISTER_FAILED, error);