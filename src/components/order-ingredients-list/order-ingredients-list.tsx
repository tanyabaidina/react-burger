import { useEffect, useState } from "react";

import style from "./order-ingredients-list.module.css";

import { ingredientsMapSelector } from "../../services/store/selectors";
import { useAppSelector } from "../../services/store/store";
import { OrderIngredient } from "../order-ingredient/order-ingredient";

interface IOrderIngredientsList {
    ingredients: Array<string>,
}
export const OrderIngredientsList = ({ingredients} : IOrderIngredientsList) => {
    const ingredientsMap = useAppSelector(ingredientsMapSelector);
    const [overflow, setOverflow] = useState(0);

    useEffect(() => {
        if (ingredients.length > 6) {
            setOverflow(ingredients.length - 5)
        }
    }, [ingredients]);

    const _currentIngredient = (item: string) => {
        return ingredientsMap?.get(item) || null
    }

    return (
        <div className={style.wrapper}>
            {ingredients.length && ingredients.slice(0, 6).map((item: string, index) => (
                _currentIngredient(item) && <OrderIngredient ingredient={_currentIngredient(item)}
                                                             key={index}
                                                             overflow={(index === 5 && overflow > 0) ? overflow : null}/>
            ))}
        </div>
    )
}