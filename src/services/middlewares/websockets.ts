import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, TRootState } from "../store/store";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";


export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<any>;
    onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, TRootState> => {
    return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";

        const {
            wsConnect,
            wsDisconnect,
            wsSendMessage,
            wsConnecting,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;

            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                isConnected = true;
                dispatch(wsConnecting());

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError(event));
                };

                socket.onclose = () => {
                    dispatch(onClose());
                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, RECONNECT_PERIOD);
                    }
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                }
            }

            if (socket && wsSendMessage?.match(action)) {
                socket.send(JSON.stringify(action.payload));
            }

            next(action);
        };
    };
};