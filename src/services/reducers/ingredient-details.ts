import {
    OPEN_MODAL_INGREDIENT_DETAILS,
    CLOSE_MODAL_INGREDIENT_DETAILS, IIngredientDetailsAction
} from "../actions/ingredient-details";
import { IIngredient } from "../../helpers/types";

interface IIngredientDetailsState {
    ingredient: IIngredient | {}
}

export const initialState: IIngredientDetailsState = {
    ingredient: {}
}

export const ingredientDetailsReducer = (state = initialState, action : IIngredientDetailsAction) : IIngredientDetailsState => {
    switch (action.type) {
        case OPEN_MODAL_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: action.ingredient
            }
        }
        case CLOSE_MODAL_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: {}
            }
        }
        default: {
            return state;
        }
    }
}