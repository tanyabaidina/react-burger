import {IUserData} from "../../helpers/types";

export interface IActionCreator {
    readonly type: string
}

type TPayload = IUserData;

export interface IActionPayloadCreator extends IActionCreator {
    readonly payload: TPayload
}

export interface IActionErrorCreator extends IActionCreator {
    readonly error: string
}

export type TAction = IActionCreator & IActionPayloadCreator & IActionErrorCreator

export const actionCreator = (type: string) : IActionCreator => {
    return {
        type: type,
    }
}

export const actionPayloadCreator = (type: string, payload: TPayload) : IActionPayloadCreator => {
    return {
        type: type,
        payload: payload
    }
}

export const actionErrorCreator = (type: string, error: string) : IActionErrorCreator => {
    return {
        type: type,
        error: error
    }
}