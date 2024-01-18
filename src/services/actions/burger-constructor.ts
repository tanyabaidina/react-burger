import {actionCreator, IActionCreator} from "./helper";
import {IIngredient, IIngredientDnD, TMoveIngredient} from "../../helpers/types";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

interface IIngredientAction extends IActionCreator {
    readonly ingredient: IIngredientDnD
}

interface IBunAction extends IActionCreator {
    readonly bun: IIngredientDnD
}

interface IMoveIngredientAction extends IActionCreator {
    readonly fromIndex: number
    readonly toIndex: number
}

export type TBurgerConstructorAction = IIngredientAction & IBunAction & IMoveIngredientAction;

export const addIngredientAction = (payload: IIngredientDnD) : IIngredientAction => (
    {...actionCreator(ADD_INGREDIENT), ingredient: payload}
)

export const addBunAction = (payload: IIngredientDnD) : IBunAction => (
    {...actionCreator(ADD_BUN), bun: payload}
)

export const deleteIngredientAction = (payload: IIngredientDnD) : IIngredientAction => (
    {...actionCreator(DELETE_INGREDIENT), ingredient: payload}
)

export const moveIngredientAction = (payload: TMoveIngredient) : IMoveIngredientAction => (
    {...actionCreator(MOVE_INGREDIENT), fromIndex: payload.from, toIndex: payload.to}
)
export const clearConstructorAction = () => actionCreator(CLEAR_CONSTRUCTOR)