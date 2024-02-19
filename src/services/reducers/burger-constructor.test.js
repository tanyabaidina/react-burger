import { burgerConstructorReducer, initialState } from "./burger-constructor";
import {
    addBunAction,
    addIngredientAction, clearConstructorAction,
    deleteIngredientAction, moveIngredientAction
} from "../actions/burger-constructor/burger-constructor-action-creators";
import {
    TEST_INGREDIENT,
    TEST_BUN,
    TEST_INGREDIENTS
} from "../../helpers/mock/test-mock-data-burger-constructor";
import update from "immutability-helper";

const testState = {
    bun: TEST_BUN,
    ingredients: TEST_INGREDIENTS
}

describe('Burger constructor reducer', () => {
    it('initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    });

    it('add ingredient', () => {
        const action = addIngredientAction(TEST_INGREDIENT);
        const addState = burgerConstructorReducer(testState, action);
        expect(addState).toEqual({
            ...testState,
            ingredients: [...testState.ingredients, action.ingredient]
        })
    });

    it('add bun', () => {
        const action = addBunAction(TEST_BUN);
        const addState = burgerConstructorReducer(testState, action);
        expect(addState).toEqual({
            ...testState,
            bun: action.bun
        })
    });

    it('delete ingredient', () => {
        const state = {
            ...testState,
            ingredients: [...testState.ingredients, TEST_INGREDIENT]
        }
        const action = deleteIngredientAction(TEST_INGREDIENT);
        const deleteState = burgerConstructorReducer(state, action);
        expect(deleteState).toEqual(testState)
    });

    it('move ingredient', () => {
        const fromIndex = 1;
        const toIndex = 3;

        const action = moveIngredientAction({from: fromIndex, to: toIndex});
        const moveState = burgerConstructorReducer(testState, action);
        expect(moveState).toEqual({
            ...testState,
            ingredients: update(testState.ingredients, {
                $splice: [
                    [fromIndex, 1],
                    [toIndex, 0, testState.ingredients[fromIndex]]
                ],
            })
        })
    });

    it('clear constructor', () => {
        const action = clearConstructorAction();
        const clearState = burgerConstructorReducer(testState, action);
        expect(clearState).toEqual({
            bun: null,
            ingredients: []
        })
    })
})