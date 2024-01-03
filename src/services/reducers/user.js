import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/auth/login";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/auth/logout";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/auth/register";
import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from "../actions/auth/user";
import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED } from "../actions/auth/user";
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from "../actions/account/forgot-password";
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from "../actions/account/reset-password";

export const initialState = {
    email: "",
    name: "",
    requestAuth: false,
    isAuth: false,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    loginError: "",
    registerError: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                isAuth: false,
                loginError: ""
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                loginError: ""
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false,
                loginError: action.error
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                isAuth: false,
                registerError: ""
            }
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                registerError: ""
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false,
                registerError: action.error
            }
        }
        case USER_REQUEST: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false,
                requestAuth: true
            }
        }
        case USER_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                requestAuth: false
            }
        }
        case USER_FAILED: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false,
                requestAuth: false
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                requestAuth: true,
                isAuth: false
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                requestAuth: false
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                isAuth: false,
                requestAuth: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false,
                forgotPasswordSuccess: false,
                resetPasswordSuccess: false
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                isAuth: true
            }
        }
        case FORGOT_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_FAILED:{
            return {
                ...state,
                forgotPasswordSuccess: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordSuccess: true
            }
        }
        case RESET_PASSWORD_REQUEST:
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordSuccess: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: true
            }
        }
        default: {
            return state;
        }
    }
}
