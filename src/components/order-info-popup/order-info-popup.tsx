import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-info-popup.module.css";

import { currentOrderSelector, ingredientsMapSelector, orderMapSelector } from "../../services/store/selectors";
import { useAppDispatch } from "../../services/store/store";
import { setCurrentOrder } from "../../services/actions/order-feed";
import { fetchOrderById } from "../../services/reducers/order-feed";

import { OrderInfoPopupIngredients } from "../order-info-popup-ingredients/order-info-popup-ingredients";

export const OrderInfoPopup = () => {
    const currentOrder = useSelector(currentOrderSelector);
    const orderMap = useSelector(orderMapSelector);
    const ingredientsMap = useSelector(ingredientsMapSelector);

    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const [totalPrice, setTotalPrice] = useState(0);

    const _currentOrder = useMemo(() =>
        (id && orderMap?.get(id)) || null,
        [id, orderMap])

    useEffect(() => {
        if (_currentOrder) {
            dispatch(setCurrentOrder(_currentOrder))
        }
    }, [dispatch, _currentOrder]);

    useEffect(() => {
        if (id && !_currentOrder) {
            dispatch(fetchOrderById(id));
        }
    }, [id]);

    useEffect(() => {
        if (ingredientsMap && currentOrder) {
            const pricesArray = currentOrder.ingredients.map((item) =>
                ingredientsMap.get(item)?.price
            );
            const _totalPrice = pricesArray.reduce((prev, cur) => {
                return ((prev || 0) + (cur || 0))
            }, 0) || 0;
            setTotalPrice(_totalPrice);
        }
    }, [ingredientsMap, currentOrder]);

    return (
        <>
            {currentOrder &&
                <div className={style.wrapper + ' pb-10'}>
                    <p className='text text_type_digits-default mt-15'>{`#${currentOrder.number}`}</p>
                    <div className={style.order__info}>
                        <p className='text text_type_main-medium'>{currentOrder.name}</p>
                        <p className={'text text_type_main-default'}>Выполнен</p>
                    </div>
                    <div className={style.ingredients__list}>
                        <p className='text text_type_main-medium'>Состав:</p>
                        <OrderInfoPopupIngredients ingredients={currentOrder.ingredients} />
                    </div>
                    <div className={style.order__minor + ' mr-5'}>
                        <p className={'text text_type_main-default text_color_inactive'}>
                            <FormattedDate date={new Date(currentOrder.createdAt)} />
                        </p>
                        <div className={style.order__price}>
                            <p className="text text_type_digits-default">{totalPrice}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>}
        </>
    )
}