import {TRootState} from "./store";

export const userDataSelector = (store: TRootState) =>  store.userData
export const orderDetailsSelector = (store: TRootState) => store.orderDetails;
export const burgerIngredientsSelector = (store: TRootState) => store.burgerIngredients;
export const burgerConstructorSelector = (store: TRootState) => store.burgerConstructor;

export const ingredientsMapSelector = (store: TRootState) => store.burgerIngredients.ingredientsMap;
export const isAuthSelector = (store: TRootState) => store.userData.isAuth;
export const loginErrorSelector = (store: TRootState) => store.userData.loginError;
export const registerErrorSelector = (store: TRootState) => store.userData.registerError;
export const resetPasswordSuccessSelector = (store: TRootState) => store.userData.resetPasswordSuccess;
export const forgotPasswordSuccessSelector = (store: TRootState) =>  store.userData.forgotPasswordSuccess;
export const ordersDataSelector = (store: TRootState) => store.orderFeed.ordersData;
export const ordersDataAuthSelector = (store: TRootState) => store.orderFeedAuth.ordersData;
export const currentOrderSelector = (store: TRootState) => store.orderFeed.currentOrder;
export const orderMapSelector = (store: TRootState) => store.orderFeed.ordersMap;
