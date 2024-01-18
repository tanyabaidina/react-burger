import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "./reducers/root-reducer";

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof rootReducer>;