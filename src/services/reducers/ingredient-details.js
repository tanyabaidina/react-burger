import {
    OPEN_MODAL_INGREDIENT_DETAILS,
    CLOSE_MODAL_INGREDIENT_DETAILS
} from "../actions/ingredient-details";

export const initialState = {
    ingredient: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
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
                ingredient: null
            }
        }
        default: {
            return state;
        }
    }
}