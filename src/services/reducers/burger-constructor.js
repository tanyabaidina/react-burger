import update from 'immutability-helper'
import {
    ADD_INGREDIENT,
    ADD_BUN,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT, CLEAR_CONSTRUCTOR
} from "../actions/burger-constructor";

export const initialState = {
    bun: null,
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
                ingredients: [...state.ingredients].filter(item => item.uniqId !== action.ingredient.uniqId)
            }
        }
        case MOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: update(state.ingredients, {
                    $splice: [
                        [action.fromIndex, 1],
                        [action.toIndex, 0, state.ingredients[action.fromIndex]]
                    ],
                })
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                ingredients: []
            }
        }
        default: {
            return state;
        }
    }
}