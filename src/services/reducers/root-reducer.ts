import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { orderFeedReducer } from "./order-feed";
import { combineReducers } from "redux";
import { orderFeedAuthReducer } from "./order-feed-auth";

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    userData: userReducer,
    orderFeed: orderFeedReducer,
    orderFeedAuth: orderFeedAuthReducer
});