import { actionCreator } from "../../helper";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "./forgot-password";

export const requestAction = () => actionCreator(FORGOT_PASSWORD_REQUEST);
export const successAction = () => actionCreator(FORGOT_PASSWORD_SUCCESS);
export const failedAction = () => actionCreator(FORGOT_PASSWORD_FAILED);