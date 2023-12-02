import {
    ADD_INGREDIENT,
    ADD_BUN,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT
} from "../actions/burger-constructor";

export const initialState = {
    bun: {},
    ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.id !== action.ingredient._id)
            }
        }
        case MOVE_INGREDIENT: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
}