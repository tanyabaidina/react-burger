import { initialState, orderDetailsReducer } from "./order-details";
import { failedAction, requestAction, successAction } from "../actions/order-details/order-details-action-creators";

describe('Order details reducer', () => {
    it('initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
    });

    it('order details request', () => {
        const action = requestAction();
        const state = orderDetailsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orderDetailsRequest: true
        })
    });

    it('order details success', () => {
        const orderNumber = 335566;
        const action = successAction(orderNumber);
        const state = orderDetailsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            order: orderNumber,
            orderDetailsRequest: false,
            orderDetailsFailed: false
        })
    });

    it('order details failed', () => {
        const action = failedAction();
        const state = orderDetailsReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            order: null,
            orderDetailsRequest: false,
            orderDetailsFailed: true
        })
    })
})