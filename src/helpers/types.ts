import {WebsocketStatus} from "./constants";

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IIngredientDnD extends IIngredient {
    count: number,
    uniqId: string
}

export interface IUserData {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export type TUserLogin = Omit<IUserData, "name">
export type TForgotPassword = Omit<IUserData, "name" | "password">

export interface IPasswordData {
    password: string | undefined;
    token: string | undefined;
}

export type TMoveIngredient = {
    from: number,
    to: number
}

export type TIngredientsPart = 'bun' | 'sauce' | 'main'

export type TIngredientsData = {
    [key in TIngredientsPart]: string;
} & {
    bun?: IIngredient[];
    sauce?: IIngredient[];
    main?: IIngredient[];
} & {};

export type TOrder = {
    number: number
}

export interface IOrderData {
    ingredients: Array<string>,
    _id: string,
    status: 'created' | 'pending' | 'done',
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    totalPrice: number
}

export type TTokenRequest = {
    token: string | null
}

export type TIngredientRequest = {
    ingredients: string[]
}

export interface IResponse  {
    success: boolean
}

export interface IApiResponse extends IResponse {
    message: string
}

export interface IIngredientsResponse extends IResponse {
    data: IIngredient[]
}

export interface IRefreshTokenResponse extends IResponse{
    accessToken: string,
    refreshToken: string
}

export interface IAuthResponse extends IRefreshTokenResponse {
    user: IUserData
    accessToken: string
    refreshToken: string
}

export interface IOrderResponse extends IResponse {
    order: TOrder
}

export interface IOrderDataResponse extends IResponse {
    orders: IOrderData[]
}

export type TError = {
    success?: boolean;
    message?: string;
    status?: number;
};

export type TOrderFeed = {
    orders: Array<IOrderData>
    success: boolean
    total: number
    totalToday: number
};

export type TFeedState = {
    status: WebsocketStatus,
    errorMessage: null | undefined | TError,
    wsError: null | string,
    wsOpen: boolean,
    wsUrl: string,
    fetchError: null | undefined | TError,
    fetchRequest: boolean,
    success: boolean,
    ordersData: TOrderFeed | null,
    currentOrder: IOrderData | null,
    ordersMap: Map<string, IOrderData> | null
};
