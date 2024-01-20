import { getIngredientsData } from "../../../helpers/api";
import { AppDispatch } from "../../store/store";
import * as actions from "./burger-ingredients-action-creators";
import { InferValueTypes } from "../helper";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export type IBurgerIngredientsActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const getIngredients = () => {
    return (dispatch: AppDispatch) => {
        dispatch(actions.requestAction());
        getIngredientsData()
            .then((response) => {
                dispatch(actions.successAction(response.data));
            })
            .catch(() => {
                dispatch(actions.failedAction())
            });
    }
};
