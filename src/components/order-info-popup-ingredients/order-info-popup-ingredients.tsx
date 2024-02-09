import style from "./order-info-popup-ingredients.module.css";

import { IngredientItem } from "./ingredient-item/ingredient-item";

interface IOrderInfoPopupIngredients {
    ingredients: Array<string>
}
export const OrderInfoPopupIngredients = ({ingredients}: IOrderInfoPopupIngredients) => {

    const uniqIngredients = ingredients.reduce((prev, cur) => {
        if (cur && prev) {
            if (prev.has(cur)) {
                prev.set(cur, (prev.get(cur) || 0) + 1)
            } else {
                prev.set(cur, 1);
            }
            return prev;
        }
        return prev;
    }, new Map<string, number>)

    return (
        <div className={style.wrapper}>
            {uniqIngredients && Array.from(uniqIngredients.keys()).map((item, index) => (
                <IngredientItem ingredientId={item} key={index} count={uniqIngredients.get(item) || 0} />
            ))}
        </div>
    )
}