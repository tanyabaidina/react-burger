import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT
} from "../actions/burger-ingredients";

export const initialState = {
    ingredients: {},
    ingredientsRequest: false,
    ingredientsFailed: false,
    currentIngredient: null
}

const ingredientsByType = (ingredients) => {
    return ingredients.reduce((group, item) => {
        const {type} = item;
        group[type] = group[type] ?? [];
        group[type].push(item);
        return group;
    }, {});
}

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: ingredientsByType(action.ingredients)
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.currentIngredient
            }
        }
        default: {
            return state;
        }
    }
}