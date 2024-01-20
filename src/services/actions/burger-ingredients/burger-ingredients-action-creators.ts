import { actionCreator } from "../helper";
import { IIngredient } from "../../../helpers/types";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT
} from "./burger-ingredients";

export const requestAction = () => actionCreator(GET_INGREDIENTS_REQUEST);
export const successAction = (payload: IIngredient[])  => (
    {...actionCreator(GET_INGREDIENTS_SUCCESS), ingredients: payload}
);
export const failedAction = () => actionCreator(GET_INGREDIENTS_FAILED);

export const setCurrentIngredient = (ingredient: IIngredient)  => (
    {...actionCreator(SET_CURRENT_INGREDIENT), currentIngredient: ingredient}
)