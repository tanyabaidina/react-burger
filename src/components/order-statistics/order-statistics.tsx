import style from "./order-statistics.module.css";

interface IOrderStatistics {
    readyOrders: Array<number>,
    ordersInProgress: Array<number>,
    allOrdersNum: number,
    todayOrdersNum: number
}
export const OrderStatistics = ({readyOrders, ordersInProgress, allOrdersNum, todayOrdersNum} : IOrderStatistics) => {
    return (
        <div className={style.wrapper}>
            <div className={style.orders__flow}>
                <div className={style.orders__flow__column}>
                    <p className={"text text_type_main-medium mb-6"}>Готовы:</p>
                    {readyOrders && readyOrders.map((num, index) => (
                        <p className={style.ready__orders + " text text_type_digits-default"} key={index}>{num}</p>
                    ))}
                </div>
                <div className={style.orders__flow__column}>
                    <p className={"text text_type_main-medium mb-6"}>В работе:</p>
                    {ordersInProgress && ordersInProgress.map((num, index) => (
                        <p className={"text text_type_digits-default"} key={index}>{num}</p>
                    ))}
                </div>
            </div>
            <div>
                <p className={"text text_type_main-medium mb-2"}>Выполнено за все время:</p>
                <p className={"text text_type_digits-large"}>{allOrdersNum}</p>
            </div>
            <div>
                <p className={"text text_type_main-medium mb-2"}>Выполнено за сегодня:</p>
                <p className={"text text_type_digits-large"}>{todayOrdersNum}</p>
            </div>
        </div>
    )
}