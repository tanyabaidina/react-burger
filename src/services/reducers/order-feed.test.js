import { fetchOrderById, getOrdersMap, initialState, orderFeedReducer } from "./order-feed";
import { setCurrentOrder, wsConnect, wsConnecting, wsDisconnect, wsError, wsMessage } from "../actions/order-feed";
import { WebsocketStatus } from "../../helpers/constants";
import { TEST_ORDER, TEST_ORDERS } from "../../helpers/mock/test-mock-data-order-feed";

describe('Order feed reducer', () => {
    it('initial state', () => {
        expect(orderFeedReducer(undefined, {})).toEqual(initialState);
    });

    it('order feed ws connecting', () => {
        const state = orderFeedReducer(initialState, wsConnecting());
        expect(state).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        })
    });

    it('order feed ws disconnect', () => {
        const state = orderFeedReducer(initialState, wsDisconnect());
        expect(state).toEqual({
            ...initialState,
            status: WebsocketStatus.OFFLINE
        })
    });

    it('order feed ws connect', () => {
        const message = "someUrl";
        const action = wsConnect(message);
        const state = orderFeedReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            wsUrl: message,
            status: WebsocketStatus.ONLINE
        })
    });

    it('order feed ws error', () => {
        const error = {
            success: false,
            message: "something wrong",
            status: 1002
        };
        const action = wsError(error);
        const state = orderFeedReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            errorMessage: error
        })
    });

    it('order feed ws message', () => {
        const ordersData = {
            orders: TEST_ORDERS,
            success: true,
            total: 34021,
            totalToday: 40
        };
        const action = wsMessage(ordersData);
        const state = orderFeedReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ordersData: ordersData,
            ordersMap: getOrdersMap(ordersData.orders)
        })
    });

    it('order feed set current order', () => {
        const action = setCurrentOrder(TEST_ORDER);
        const state = orderFeedReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            currentOrder: TEST_ORDER
        })
    });

    it('order feed get order by id', () => {
        const payload = {
            orders: [TEST_ORDER]
        } ;
        const action = {type: fetchOrderById.fulfilled.type, payload: payload};
        const state = orderFeedReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            currentOrder: TEST_ORDER
        })
    })
})