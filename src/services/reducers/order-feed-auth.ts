import { createReducer } from "@reduxjs/toolkit";
import { TFeedState } from "../../helpers/types";
import { WebsocketStatus } from "../../helpers/constants";
import {
    wsConnectAuth,
    wsConnectingAuth,
    wsDisconnectAuth,
    wsErrorAuth,
    wsMessageAuth
} from "../actions/order-feed-auth";
import { getOrdersMap } from "./order-feed";

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

export const orderFeedAuthReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectingAuth, state => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsDisconnectAuth, state => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsConnectAuth, (state, action) => {
            state.wsUrl = action.payload
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsErrorAuth, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(wsMessageAuth, (state, action) => {
            state.ordersData = {
                ...action.payload,
                orders: action.payload.orders?.sort((a, b) => b.number - a.number)
            }
            state.ordersMap = getOrdersMap( action.payload.orders);
        })
});