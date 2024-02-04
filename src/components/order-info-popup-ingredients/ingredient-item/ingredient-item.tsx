import React, { useEffect, useState } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-item.module.css";

import { ingredientsMapSelector } from "../../../services/store/selectors";
import { useAppSelector } from "../../../services/store/store";

import { OrderIngredient } from "../../order-ingredient/order-ingredient";
import { IIngredient } from "../../../helpers/types";

interface IIngredientItem {
    ingredientId: string,
    count: number
}

export const IngredientItem = ({ingredientId, count} : IIngredientItem) => {
    const [currentIngredient, setCurrentIngredient] = useState<IIngredient | undefined>();
    const ingredientsMap = useAppSelector(ingredientsMapSelector);

    useEffect(() => {
        if (ingredientsMap) {
            setCurrentIngredient(ingredientsMap.get(ingredientId))
        }
    }, []);

    if (currentIngredient)
        return (
            <div className={style.wrapper + ' mr-5'}>
                <div className={style.wrapper__item}>
                    <OrderIngredient ingredient={currentIngredient} overflow={null}/>
                    <p className={'text text_type_main-default'}>{currentIngredient.name}</p>
                </div>
                <div className={style.wrapper__item}>
                    <p className={'text text_type_main-default'}>{`${count} x ${currentIngredient.price}`}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        )

    return null;
}