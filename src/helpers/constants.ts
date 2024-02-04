export const API_URL: string = "https://norma.nomoreparties.space/api";
export const WS_URL: string = "wss://norma.nomoreparties.space";

export const TABS = {
    BUNS: 'BUNS',
    MAINS: 'MAINS',
    SAUCES: 'SAUCES',
    TABS: 'TABS'
} as const;

export const ITEM_TYPES = {
    BUN: 'BUN',
    INGREDIENT: 'INGREDIENT',
    ITEM: 'ITEM'
} as const;

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export const showOrderStatus = new Map();
showOrderStatus.set('done', 'Выполнен');
showOrderStatus.set('created', 'Создан');
showOrderStatus.set('pending', 'Готовится');
