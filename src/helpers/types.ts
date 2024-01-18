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

export type TTokenRequest = {
    token: string | null
}

export type TIngredientRequest = {
    ingredients: string[]
}

export type TResponse =
    TUserLogin |
    IPasswordData |
    TForgotPassword |
    TTokenRequest |
    TIngredientRequest
