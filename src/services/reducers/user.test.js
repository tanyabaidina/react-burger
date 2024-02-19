import { initialState, userReducer } from "./user";
import {
    failedAction as loginFailedAction,
    requestAction as loginRequestAction,
    successAction as loginSuccessAction
} from "../actions/auth/login/login-action-creators";

import {
    failedAction as registerFailedAction,
    requestAction as registerRequestAction,
    successAction as registerSuccessAction
} from "../actions/auth/register/register-action-creators";
import {
    failedAction as userFailedAction, failedUpdateUserAction,
    requestAction as userRequestAction, requestUpdateUserAction,
    successAction as userSuccessAction, successUpdateUserAction
} from "../actions/auth/user/user-action-creators";
import {
    failedAction as logoutFailedAction,
    requestAction as logoutRequestAction,
    successAction as logoutSuccessAction
} from "../actions/auth/logout/logout-action-creators";
import {
    failedAction as forgotPasswordFailedAction,
    requestAction as forgotPasswordRequestAction,
    successAction as forgotPasswordSuccessAction
} from "../actions/account/forgot-password/forgot-password-action-creators";
import {
    failedAction as resetPasswordFailedAction,
    requestAction as resetPasswordRequestAction,
    successAction as resetPasswordSuccessAction
} from "../actions/account/reset-password/reset-password-action-creators";
import { TEST_USER } from "../../helpers/mock/test-mock-data-user";

const logoutState = {
    ...initialState,
    email: TEST_USER.email,
    name: TEST_USER.name,
    isAuth: true
};

describe('User reducer', () => {
    it('initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    });

    it('user login request', () => {
        const action = loginRequestAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isAuth: false,
            loginError: ""
        })
    });

    it('user login success', () => {
        const action = loginSuccessAction(TEST_USER);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: TEST_USER.email,
            name: TEST_USER.name,
            isAuth: true,
            loginError: ""
        })
    });

    it('user login failed', () => {
        const message = "something wrong";
        const action = loginFailedAction(message);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: "",
            name: "",
            isAuth: false,
            loginError: message
        })
    });

    it('user register request', () => {
        const action = registerRequestAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isAuth: false,
            registerError: ""
        })
    });

    it('user register success', () => {
        const action = registerSuccessAction(TEST_USER);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email:TEST_USER.email,
            name: TEST_USER.name,
            isAuth: true,
            registerError: ""
        })
    });

    it('user register failed', () => {
        const message = "something wrong";
        const action = registerFailedAction(message);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: "",
            name: "",
            isAuth: false,
            registerError: message
        })
    });

    it('user request', () => {
        const action = userRequestAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: "",
            name: "",
            isAuth: false,
            requestAuth: true
        })
    });

    it('user success', () => {
        const action = userSuccessAction(TEST_USER);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: TEST_USER.email,
            name: TEST_USER.name,
            isAuth: true,
            requestAuth: false
        })
    });

    it('user failed', () => {
        const action = userFailedAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: "",
            name: "",
            isAuth: false,
            requestAuth: false
        })
    });

    it('update user request', () => {
        const action = requestUpdateUserAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            requestAuth: true,
            isAuth: false
        })
    });

    it('update user success', () => {
        const action = successUpdateUserAction(TEST_USER);
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            email: TEST_USER.email,
            name: TEST_USER.name,
            isAuth: true,
            requestAuth: false
        })
    });

    it('update user failed', () => {
        const action = failedUpdateUserAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isAuth: false,
            requestAuth: false
        })
    });

    it('user logout request', () => {
        const action = logoutRequestAction();
        const state = userReducer(logoutState, action);
        expect(state).toEqual(logoutState);
    });

    it('user logout success', () => {
        const action = logoutSuccessAction();
        const state = userReducer(logoutState, action);
        expect(state).toEqual({
            ...logoutState,
            email: "",
            name: "",
            isAuth: false,
            forgotPasswordSuccess: false,
            resetPasswordSuccess: false
        })
    });

    it('user logout failed', () => {
        const action = logoutFailedAction();
        const state = userReducer(logoutState, action);
        expect(state).toEqual(logoutState)
    });

    it('user forgot password request', () => {
        const action = forgotPasswordRequestAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            forgotPasswordSuccess: false
        })
    });

    it('user forgot password success', () => {
        const action = forgotPasswordSuccessAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            forgotPasswordSuccess: true
        })
    });

    it('user forgot password failed', () => {
        const action = forgotPasswordFailedAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            forgotPasswordSuccess: false
        })
    });

    it('user reset password request', () => {
        const action = resetPasswordRequestAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            resetPasswordSuccess: false
        })
    });

    it('user reset password success', () => {
        const action = resetPasswordSuccessAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            resetPasswordSuccess: true
        })
    });

    it('user reset password failed', () => {
        const action = resetPasswordFailedAction();
        const state = userReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            resetPasswordSuccess: false
        })
    });
})