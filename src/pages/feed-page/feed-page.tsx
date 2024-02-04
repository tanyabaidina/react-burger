import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import style from "./feed-page.module.css";

import { useAppDispatch } from "../../services/store/store";
import { wsConnect, wsDisconnect } from "../../services/actions/order-feed";
import { ordersDataSelector } from "../../services/store/selectors";

import { OrderFeed } from "../../components/order-feed/order-feed";
import { OrderStatistics } from "../../components/order-statistics/order-statistics";
import { WS_URL } from "../../helpers/constants";

export const FeedPage = () => {
    const dispatch = useAppDispatch();
    const ordersData = useSelector(ordersDataSelector);
    const [readyOrders, setReadyOrders] = useState<number[]>([]);
    const [ordersInProgress, setOrdersInProgress] = useState<number[]>([]);

    useEffect(() => {
        dispatch(wsConnect(`${WS_URL}/orders/all`));

        return () => {
            dispatch(wsDisconnect());
        }
    }, [])

    useEffect(() => {
        if (ordersData) {
            const _readyOrders = ordersData.orders.filter((order) => order.status === 'done')
                .slice(0, 10).map((item) => item.number);

            const _ordersInProgress = ordersData.orders.filter((order) => order.status === 'pending')
                .slice(0, 10).map((item) => item.number);
            setReadyOrders(_readyOrders);
            setOrdersInProgress(_ordersInProgress)
        }
    }, [ordersData]);


    if (ordersData)
        return (
            <>
                <section className={style.wrapper__order__feed}>
                    <h2 className={"text text_type_main-large"}>Лента заказов</h2>
                    {ordersData && <OrderFeed orders={ordersData.orders} />}
                </section>
                <OrderStatistics readyOrders={readyOrders}
                                 ordersInProgress={ordersInProgress}
                                 allOrdersNum={ordersData.total}
                                 todayOrdersNum={ordersData.totalToday} />
            </>
        )

    return null;
}