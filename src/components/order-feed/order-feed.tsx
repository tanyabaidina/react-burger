import feedStyle from "./order-feed.module.css";

import { OrderElement } from "../order-element/order-element";
import { IOrderData } from "../../helpers/types";

interface IOrderFeed {
    orders: IOrderData[]
}

export const OrderFeed = ({orders} : IOrderFeed) => {

    return (
        <div className={feedStyle.feed__wrapper}>
            <div className={feedStyle.orders__list}>
                {orders && orders.map((order, index) => (
                    <OrderElement order={order} key={index}/>
                ))}
            </div>
        </div>
    )
}