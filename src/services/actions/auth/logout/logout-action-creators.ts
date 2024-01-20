import { actionCreator } from "../../helper";
import { LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./logout";

export const requestAction = () => actionCreator(LOGOUT_REQUEST);
export const successAction = () => actionCreator(LOGOUT_SUCCESS);
export const failedAction = () => actionCreator(LOGOUT_FAILED);