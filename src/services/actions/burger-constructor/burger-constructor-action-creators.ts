import { IIngredientDnD, TMoveIngredient } from "../../../helpers/types";
import { actionCreator } from "../helper";
import { ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, MOVE_INGREDIENT } from "./burger-constructor";

export const addIngredientAction = (payload: IIngredientDnD)  => (
    {...actionCreator(ADD_INGREDIENT), ingredient: payload}
)

export const addBunAction = (payload: IIngredientDnD)  => (
    {...actionCreator(ADD_BUN), bun: payload}
)

export const deleteIngredientAction = (payload: IIngredientDnD)  => (
    {...actionCreator(DELETE_INGREDIENT), ingredient: payload}
)

export const moveIngredientAction = (payload: TMoveIngredient)  => (
    {...actionCreator(MOVE_INGREDIENT), fromIndex: payload.from, toIndex: payload.to}
)
export const clearConstructorAction = () => actionCreator(CLEAR_CONSTRUCTOR)