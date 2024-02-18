import { burgerIngredientsReducer, getIngredientsMap, ingredientsByType, initialState } from "./burger-ingredients";
import {
    failedAction,
    requestAction, setCurrentIngredient,
    successAction
} from "../actions/burger-ingredients/burger-ingredients-action-creators";
import { CURRENT_INGREDIENT, TEST_INGREDIENTS } from "../../helpers/mock/test-mock-data-burger-ingredients";

describe('Burger ingredients reducer', () => {
    it('initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
    });

    it('ingredients request', () => {
        const action = requestAction();
        const state = burgerIngredientsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredientsRequest: true
        })
    });

    it('ingredients success', () => {
        const action = successAction(TEST_INGREDIENTS);
        const state = burgerIngredientsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: ingredientsByType(TEST_INGREDIENTS),
            ingredientsMap: getIngredientsMap(TEST_INGREDIENTS)
        })
    });

    it('ingredients failed', () => {
        const action = failedAction();
        const state = burgerIngredientsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true
        })
    });

    it('set current ingredient', () => {
        const action = setCurrentIngredient(CURRENT_INGREDIENT);
        const state = burgerIngredientsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            currentIngredient: CURRENT_INGREDIENT
        })
    })

})