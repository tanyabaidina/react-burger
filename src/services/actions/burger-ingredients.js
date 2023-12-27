import { getIngredientsData } from "../../helpers/api";
import { actionCreator } from "./helper";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

const requestAction = () => actionCreator(GET_INGREDIENTS_REQUEST);
const successAction = (payload) => (
    {...actionCreator(GET_INGREDIENTS_SUCCESS), ingredients: payload}
);
const failedAction = () => actionCreator(GET_INGREDIENTS_FAILED);

export const setCurrentIngredient = (ingredient) => (
    {...actionCreator(SET_CURRENT_INGREDIENT), currentIngredient: ingredient}
)

export const getIngredients = () => {
    return (dispatch) => {
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
