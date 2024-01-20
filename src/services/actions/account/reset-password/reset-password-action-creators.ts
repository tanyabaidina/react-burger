import { actionCreator } from "../../helper";
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./reset-password";

export const requestAction = () => actionCreator(RESET_PASSWORD_REQUEST);
export const successAction = () => actionCreator(RESET_PASSWORD_SUCCESS);
export const failedAction = () => actionCreator(RESET_PASSWORD_FAILED);