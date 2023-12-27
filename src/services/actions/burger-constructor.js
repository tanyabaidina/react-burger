import { actionCreator } from "./helper";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredientAction = (payload) => (
    {...actionCreator(ADD_INGREDIENT), ingredient: payload}
)

export const addBunAction = (payload) => (
    {...actionCreator(ADD_BUN), bun: payload}
)

export const deleteIngredientAction = (payload) => (
    {...actionCreator(DELETE_INGREDIENT), ingredient: payload}
)

export const moveIngredientAction = (payload) => (
    {...actionCreator(MOVE_INGREDIENT), fromIndex: payload.from, toIndex: payload.to}
)
export const clearConstructorAction = () => actionCreator(CLEAR_CONSTRUCTOR)