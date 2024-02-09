import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { OrderIngredientsList } from "../order-ingredients-list/order-ingredients-list";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-element.module.css";


import { ingredientsMapSelector } from "../../services/store/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { setCurrentOrder } from "../../services/actions/order-feed";

import { showOrderStatus } from "../../helpers/constants";
import { IOrderData } from "../../helpers/types";

interface IOrderElement {
    order: IOrderData
}

export const OrderElement = ({order} : IOrderElement) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const ingredientsMap = useAppSelector(ingredientsMapSelector);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (ingredientsMap) {
            const pricesArray = order.ingredients.map((item) =>
                ingredientsMap.get(item)?.price
            );
            const _totalPrice = pricesArray.reduce((prev, cur) => {
                return ((prev || 0) + (cur || 0))
            }, 0) || 0;
            setTotalPrice(_totalPrice);
        }
    }, [ingredientsMap, order]);

    const orderClick = () => {
        dispatch(setCurrentOrder({...order, totalPrice: totalPrice}))
    }


    return (
        <Link to={`${order.number}`} state={{ background: location }} className={style.link}>
            <div className={style.wrapper} onClick={orderClick}>
                <div className={style.order__info}>
                    <p className={`text text_type_digits-default`}>{`#${order.number}`}</p>
                    <p className={'text text_type_main-default text_color_inactive'}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </p>
                </div>
                <div className={style.order__status}>
                    <p className={`text text_type_main-medium`}>{order.name}</p>
                    <p className={`text text_type_main-default ${order.status === 'done' ? style.status__color : ""}`}>{showOrderStatus.get(order.status)}</p>
                </div>
                <div className={style.order__info}>
                    <OrderIngredientsList ingredients={order.ingredients} />
                    <div className={style.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    )
}