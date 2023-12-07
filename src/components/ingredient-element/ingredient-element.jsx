import { useDrag } from 'react-dnd';
import ingredientStyle from './ingredient-element.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../helpers/types";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function IngredientElement({ item, onClick, type }) {
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const array = [...[bun, bun], ...ingredients].filter((_item) => _item?._id === item._id)
        setCount(array.length);
    }, [bun, ingredients]);

    const [{ opacity }, drag] = useDrag(() => ({
        type: type,
        item: item,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.1 : 1,
        }),
    }))

    return (
        <div className={ingredientStyle.wrapper}
             key={item._id}
             onClick={() => onClick(item)}
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
    )
}

IngredientElement.propTypes = {
    item: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default IngredientElement;