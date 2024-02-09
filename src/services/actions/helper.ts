import { IUserData } from "../../helpers/types";
import { TUserActionTypes } from "./auth/user/user";
import { TLoginActionTypes } from "./auth/login/login";
import { TLogoutActionTypes } from "./auth/logout/logout";
import { TRegisterActionTypes } from "./auth/register/register";
import { TForgotPasswordActionTypes } from "./account/forgot-password/forgot-password";
import { TResetPasswordActionTypes } from "./account/reset-password/reset-password";
import { TWebsocketActions } from "./order-feed";
import { TWebsocketAuthActions } from "./order-feed-auth";

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

function inferTypeName<T extends string>(arg: T) : T {
    return arg;
}

export const actionCreator = <T extends string>(type: T)  => ({
    type: inferTypeName(type)
})

export const actionPayloadCreator = <T extends string>(type: T, payload: TPayload)  => ({
    type: inferTypeName(type),
    payload: payload
})

export const actionErrorCreator = <T extends string>(type: T, error: string)  => ({
    type: inferTypeName(type),
    error: error
})

export type TActionCreator = ReturnType<typeof actionCreator>;

export type TActionPayloadCreator = ReturnType<typeof actionPayloadCreator>;

export type TActionErrorCreator = ReturnType<typeof actionErrorCreator>

export type TUserActions =
    TUserActionTypes |
    TLoginActionTypes |
    TLogoutActionTypes |
    TRegisterActionTypes |
    TForgotPasswordActionTypes |
    TResetPasswordActionTypes;

export type TAction =
    TUserActions |
    TWebsocketActions |
    TWebsocketAuthActions;

type TPayload = IUserData;