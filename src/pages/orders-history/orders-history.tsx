import { useEffect } from "react";

import style from "./orders-history.module.css";

import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { wsConnectAuth, wsDisconnectAuth } from "../../services/actions/order-feed-auth";
import { ordersDataAuthSelector } from "../../services/store/selectors";

import { OrderFeed } from "../../components/order-feed/order-feed";

import { WS_URL } from "../../helpers/constants";
import { ACCESS_TOKEN, getToken } from "../../helpers/tokens";

export const OrdersHistoryPage = () => {
    const dispatch = useAppDispatch();
    const ordersData = useAppSelector(ordersDataAuthSelector);

    useEffect(() => {
        dispatch(wsConnectAuth(`${WS_URL}/orders?token=${getToken(ACCESS_TOKEN)}`));

        return () => {
            dispatch(wsDisconnectAuth());
        }
    }, [])

    return (
        <section className={style.wrapper}>
            {ordersData ? <OrderFeed orders={ordersData.orders} /> :
            <span className={'text text_type_main-default text_color_inactive'}>Нет заказов</span>}
        </section>
    )
}