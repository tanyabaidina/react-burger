import { initialState, orderFeedAuthReducer } from "./order-feed-auth";
import {
    wsConnectAuth,
    wsConnectingAuth,
    wsDisconnectAuth,
    wsErrorAuth,
    wsMessageAuth
} from "../actions/order-feed-auth";
import { WebsocketStatus } from "../../helpers/constants";
import { TEST_ORDERS } from "../../helpers/mock/test-mock-data-order-feed";
import { getOrdersMap } from "./order-feed";

describe('Order feed auth reducer', () => {
    it('initial state', () => {
        expect(orderFeedAuthReducer(undefined, {})).toEqual(initialState)
    });

    it('order feed auth ws connecting', () => {
        const state = orderFeedAuthReducer(initialState, wsConnectingAuth());
        expect(state).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        })
    });

    it('order feed auth ws disconnect', () => {
        const state = orderFeedAuthReducer(initialState, wsDisconnectAuth());
        expect(state).toEqual({
            ...initialState,
            status: WebsocketStatus.OFFLINE
        })
    });

    it('order feed auth ws connect', () => {
        const message = "someUrl";
        const action = wsConnectAuth(message);
        const state = orderFeedAuthReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            wsUrl: message,
            status: WebsocketStatus.ONLINE
        })
    });

    it('order feed auth ws error', () => {
        const error = {
            success: false,
            message: "something wrong",
            status: 1002
        };
        const action = wsErrorAuth(error);
        const state = orderFeedAuthReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            errorMessage: error
        })
    });

    it('order feed auth ws message', () => {
        const ordersData = {
            orders: TEST_ORDERS,
            success: true,
            total: 34033,
            totalToday: 52
        };
        const action = wsMessageAuth(ordersData);
        const state = orderFeedAuthReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ordersData: ordersData,
            ordersMap: getOrdersMap(ordersData.orders)
        })
    })
})