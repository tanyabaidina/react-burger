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
    currentIngredient: IIngredient | null,
    ingredientsMap: Map<string, IIngredient> | null
}

export const initialState: IBurgerIngredientsState = {
    ingredients: {} as TIngredientsData,
    ingredientsRequest: false,
    ingredientsFailed: false,
    currentIngredient: null,
    ingredientsMap: null
}

export const ingredientsByType = (ingredients : IIngredient[]) : TIngredientsData => {
    return ingredients.reduce((group: TIngredientsData, item) => {
        const tempData: { [key: string]: IIngredient[] } = group;
        return {
        ...group,
        [item.type]: [...(tempData[item.type] || []), item]}
    }, {} as TIngredientsData);
}

export const getIngredientsMap = (ingredients : IIngredient[]) => {
    const _map = new Map<string, IIngredient>();
    ingredients.forEach((item) => {
        _map.set(item._id, item);
    });

    return _map;
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
                ingredients: ingredientsByType(action.ingredients),
                ingredientsMap: getIngredientsMap(action.ingredients)
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