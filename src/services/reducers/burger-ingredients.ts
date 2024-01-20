import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    IBurgerIngredientsActionTypes,
    SET_CURRENT_INGREDIENT
} from "../actions/burger-ingredients/burger-ingredients";
import { IIngredient, TIngredientsData } from "../../helpers/types";

interface IBurgerIngredientsState {
    ingredients: TIngredientsData;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    currentIngredient: IIngredient | null
}

export const initialState: IBurgerIngredientsState = {
    ingredients: {} as TIngredientsData,
    ingredientsRequest: false,
    ingredientsFailed: false,
    currentIngredient: null
}

const ingredientsByType = (ingredients : IIngredient[]) : TIngredientsData => {
    return ingredients.reduce((group: TIngredientsData, item) => {
        const tempData: { [key: string]: IIngredient[] } = group;
        return {
        ...group,
        [item.type]: [...(tempData[item.type] || []), item]}
    }, {} as TIngredientsData);
}

export const burgerIngredientsReducer = (state = initialState, action : IBurgerIngredientsActionTypes)
    : IBurgerIngredientsState => {
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