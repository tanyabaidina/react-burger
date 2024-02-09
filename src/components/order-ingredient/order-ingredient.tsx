import style from "./order-ingredient.module.css";

import { IIngredient } from "../../helpers/types";

interface IOrderIngredient {
    ingredient: IIngredient | null,
    overflow: number | null
}

export const OrderIngredient = ({ingredient, overflow} : IOrderIngredient) => {

    if (ingredient)
        return (
            <div className={style.wrapper} >
                <img src={ingredient.image_mobile} alt={ingredient.name}/>
                {overflow &&
                    <div className={style.count}>
                        <span className={'text text_type_digits-default'}>{`+${overflow}`}</span>
                    </div>}
            </div>
        )

    return null;
}