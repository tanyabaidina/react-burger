import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { orderFeedReducer } from "./order-feed";
import { combineReducers } from "redux";
import { orderFeedAuthReducer } from "./order-feed-auth";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    orderDetails: orderDetailsReducer,
    userData: userReducer,
    orderFeed: orderFeedReducer,
    orderFeedAuth: orderFeedAuthReducer
});