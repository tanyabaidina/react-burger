import * as actions from "./burger-constructor-action-creators";
import { InferValueTypes } from "../helper";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export type TBurgerConstructorActionTypes = ReturnType<InferValueTypes<typeof actions>>;