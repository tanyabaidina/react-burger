import { createAction } from "@reduxjs/toolkit";
import { TError, TOrderFeed } from "../../helpers/types";

export const wsConnectAuth = createAction<string, 'ORDER_FEED_AUTH_WS_CONNECT'>('ORDER_FEED_AUTH_WS_CONNECT');
export const wsDisconnectAuth = createAction("ORDER_FEED_AUTH_WS_DISCONNECT");
export const wsConnectingAuth = createAction('ORDER_FEED_AUTH_WS_CONNECTING')
export const wsOpenAuth = createAction("ORDER_FEED_AUTH_WS_OPEN");
export const wsCloseAuth = createAction("ORDER_FEED_AUTH_WS_CLOSE");
export const wsErrorAuth = createAction<TError, "ORDER_FEED_AUTH_WS_ERROR">("ORDER_FEED_AUTH_WS_ERROR");
export const wsMessageAuth = createAction<TOrderFeed, "ORDER_FEED_AUTH_WS_MESSAGE">("ORDER_FEED_AUTH_WS_MESSAGE");

export type TWebsocketAuthActions = ReturnType<typeof wsConnectAuth>
    | ReturnType<typeof wsDisconnectAuth>
    | ReturnType<typeof wsConnectingAuth>
    | ReturnType<typeof wsOpenAuth>
    | ReturnType<typeof wsCloseAuth>
    | ReturnType<typeof wsErrorAuth>
    | ReturnType<typeof wsMessageAuth>;
