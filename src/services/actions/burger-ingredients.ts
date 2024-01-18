import { getIngredientsData } from "../../helpers/api";
import {actionCreator, IActionCreator} from "./helper";
import {IIngredient} from "../../helpers/types";
import {AppDispatch} from "../store";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

interface IIngredientSuccessAction extends IActionCreator {
    ingredients: IIngredient[]
}

interface ISetCurrentIngredientAction extends IActionCreator {
    currentIngredient: IIngredient
}

export type IBurgerIngredientsAction = IIngredientSuccessAction & ISetCurrentIngredientAction

const requestAction = () => actionCreator(GET_INGREDIENTS_REQUEST);
const successAction = (payload: IIngredient[]) : IIngredientSuccessAction => (
    {...actionCreator(GET_INGREDIENTS_SUCCESS), ingredients: payload}
);
const failedAction = () => actionCreator(GET_INGREDIENTS_FAILED);

export const setCurrentIngredient = (ingredient: IIngredient) : ISetCurrentIngredientAction => (
    {...actionCreator(SET_CURRENT_INGREDIENT), currentIngredient: ingredient}
)

export const getIngredients = () => {
    return (dispatch: AppDispatch) => {
        dispatch(requestAction());
        getIngredientsData()
            .then((response) => {
                dispatch(successAction(response.data));
            })
            .catch(() => {
                dispatch(failedAction())
            });
    }
};
