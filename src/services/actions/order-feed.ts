import { createAction } from "@reduxjs/toolkit";
import { IOrderData, TError, TOrderFeed } from "../../helpers/types";

export const wsConnect = createAction<string, 'ORDER_FEED_WS_CONNECT'>('ORDER_FEED_WS_CONNECT');
export const wsDisconnect = createAction("ORDER_FEED_WS_DISCONNECT");
export const wsConnecting = createAction("ORDER_FEED_WS_CONNECTING");
export const wsOpen = createAction("ORDER_FEED_WS_OPEN");
export const wsClose = createAction("ORDER_FEED_WS_CLOSE");
export const wsError = createAction<TError, "ORDER_FEED_WS_ERROR">("ORDER_FEED_WS_ERROR");
export const wsMessage = createAction<TOrderFeed, "ORDER_FEED_WS_MESSAGE">("ORDER_FEED_WS_MESSAGE");
export const setCurrentOrder = createAction<IOrderData, 'SET_CURRENT_ORDER'>('SET_CURRENT_ORDER');

export type TWebsocketActions = ReturnType<typeof wsConnect>
    | ReturnType<typeof wsDisconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsError>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof setCurrentOrder>;
