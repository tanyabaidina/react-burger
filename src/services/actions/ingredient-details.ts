import {IActionCreator} from "./helper";
import {IIngredient} from "../../helpers/types";

export const OPEN_MODAL_INGREDIENT_DETAILS = 'OPEN_MODAL_INGREDIENTS_DETAILS';
export const CLOSE_MODAL_INGREDIENT_DETAILS = 'CLOSE_MODAL_INGREDIENTS_DETAILS';

export interface IIngredientDetailsAction extends IActionCreator{
    ingredient: IIngredient | {}
}