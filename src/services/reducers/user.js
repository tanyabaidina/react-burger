import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/auth/login";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/auth/logout";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/auth/register";
import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from "../actions/auth/user";

export const initialState = {
    email: "",
    name: "",
    isAuth: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST: {
            return {
                ...state,
                isAuth: false
            }
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case USER_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true
            }
        }
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
        case REGISTER_FAILED:
        case USER_FAILED: {
            return {
                ...state,
                email: "",
                name: "",
                isAuth: false
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
        case USER_REQUEST: {
            return {
                ...state,
                email: "",
                name: ""
            }
        }
        default: {
            return state;
        }
    }
}
