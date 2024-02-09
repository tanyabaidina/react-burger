import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { IOrderData, TFeedState } from "../../helpers/types";
import {
    wsConnect,
    wsDisconnect,
    wsConnecting,
    wsMessage,
    setCurrentOrder,
    wsError
} from "../actions/order-feed";
import { WebsocketStatus } from "../../helpers/constants";
import { getOrderById } from "../../helpers/api";

export const initialState: TFeedState = {
    status: WebsocketStatus.OFFLINE,
    success: false,
    errorMessage: null,
    wsUrl: "",
    wsOpen: false,
    wsError: null,
    fetchError: null,
    fetchRequest: false,
    ordersData: null,
    currentOrder: null,
    ordersMap: null
};

export const getOrdersMap = (orders: IOrderData[]) => {
    const _map = new Map<string, IOrderData>();
    orders.forEach((item) => {
        _map.set(item.number.toString(), item);
    });

    return _map;
}

export const fetchOrderById = createAsyncThunk(
    'FETCH_ORDER_BY_ID',
    async (id: string, thunkAPI) => {
        const response = await getOrderById(id)
        return response;
    }
)

export const orderFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, state => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsDisconnect, state => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsConnect, (state, action) => {
            state.wsUrl = action.payload
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsError, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.ordersData = {
                ...action.payload,
                orders: action.payload.orders.sort((a, b) => b.number - a.number)
            }
            state.ordersMap = getOrdersMap(action.payload.orders);
        })
        .addCase(setCurrentOrder, (state, action) => {
            state.currentOrder = action.payload;
        })
        .addCase(fetchOrderById.fulfilled, (state, action) => {
            state.currentOrder = action.payload.orders?.at(0) || null
        })
});