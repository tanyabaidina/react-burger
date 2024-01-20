import {TRootState} from "./store";

export const userDataSelector = (store: TRootState) =>  store.userData
export const orderDetailsSelector = (store: TRootState) => store.orderDetails;
export const ingredientDetailsSelector = (store: TRootState) => store.ingredientDetails;
export const burgerIngredientsSelector = (store: TRootState) => store.burgerIngredients;
export const burgerConstructorSelector = (store: TRootState) => store.burgerConstructor;

export const isAuthSelector = (store: TRootState) => store.userData.isAuth;
export const loginErrorSelector = (store: TRootState) => store.userData.loginError;
export const registerErrorSelector = (store: TRootState) => store.userData.registerError;
export const resetPasswordSuccessSelector = (store: TRootState) => store.userData.resetPasswordSuccess;
export const forgotPasswordSuccessSelector = (store: TRootState) =>  store.userData.forgotPasswordSuccess;
