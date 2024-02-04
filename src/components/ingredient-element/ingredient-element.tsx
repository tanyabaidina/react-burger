import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from 'react-dnd';

import ingredientStyle from './ingredient-element.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { setCurrentIngredient } from "../../services/actions/burger-ingredients/burger-ingredients-action-creators";
import { IIngredient } from "../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { burgerConstructorSelector } from "../../services/store/selectors";

interface IIngredientElement {
    item: IIngredient;
    type: string
}

function IngredientElement({ item, type } : IIngredientElement) {
    const { bun, ingredients } = useAppSelector(burgerConstructorSelector);
    const [count, setCount] = useState(0);
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const array = [...[bun, bun], ...ingredients].filter((_item) => _item?._id === item._id)
        setCount(array.length);
    }, [bun, ingredients]);

    const ingredientClick = () => {
        dispatch(setCurrentIngredient(item))
    }

    const [{ opacity }, drag] = useDrag(() => ({
        type: type,
        item: item,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.1 : 1,
        }),
    }))

    return (
        <Link to={`/ingredients/${item._id}`} state={{ background: location }} className={ingredientStyle.link}>
            <div className={ingredientStyle.wrapper}
                 onClick={ingredientClick}
                 key={item._id}
                 ref={drag}
                 style={{ opacity }}>
                {count > 0 &&
                    <Counter count={count} size="default" />}
                <img className={"mb-2"} src={item.image} alt={item.name}></img>
                <div className={ingredientStyle.price__wrapper + " mb-2"}>
                  <span className={ingredientStyle.price + " text text_type_digits-default" } >
                    {item.price}
                  </span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={ ingredientStyle.title + " text text_type_main-default"}>
                    {item.name}
                </p>
            </div>
        </Link>
    )
}

export default IngredientElement;