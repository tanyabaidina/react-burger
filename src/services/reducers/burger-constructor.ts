import update from 'immutability-helper'
import {
    ADD_INGREDIENT,
    ADD_BUN,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    TBurgerConstructorActionTypes,
} from "../actions/burger-constructor/burger-constructor";
import { IIngredientDnD } from "../../helpers/types";

interface IBurgerConstructorState {
    bun: IIngredientDnD | null,
    ingredients: IIngredientDnD[]
}

export const initialState : IBurgerConstructorState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action : TBurgerConstructorActionTypes)
    : IBurgerConstructorState => {
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
                ingredients: [...state.ingredients].filter( (item: IIngredientDnD) =>
                    item.uniqId !== action.ingredient.uniqId)
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