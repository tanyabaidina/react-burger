import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/root-reducer";
import { socketMiddleware } from "../middlewares/websockets";

import {
    wsConnect,
    wsDisconnect,
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
    wsConnecting
} from "../actions/order-feed";
import {
    wsCloseAuth,
    wsConnectAuth,
    wsConnectingAuth,
    wsDisconnectAuth,
    wsErrorAuth, wsMessageAuth,
    wsOpenAuth
} from "../actions/order-feed-auth";

const orderFeedMiddleware = socketMiddleware({
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onError: wsError,
    onClose: wsClose,
    onMessage: wsMessage,
});

const orderFeedAuthMiddleware = socketMiddleware({
    wsConnect: wsConnectAuth,
    wsDisconnect: wsDisconnectAuth,
    wsConnecting: wsConnectingAuth,
    onOpen: wsOpenAuth,
    onError: wsErrorAuth,
    onClose: wsCloseAuth,
    onMessage: wsMessageAuth,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(orderFeedMiddleware, orderFeedAuthMiddleware)
    }
})

export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
