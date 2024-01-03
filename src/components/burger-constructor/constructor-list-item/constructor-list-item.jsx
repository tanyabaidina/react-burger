import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import constructorStyle from "../burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    deleteIngredientAction,
    moveIngredientAction
} from "../../../services/actions/burger-constructor";
import { ingredientType } from "../../../helpers/types";
import { ITEM_TYPES } from "../../../helpers/constants";

function ConstructorListItem({ item, index, isHover }) {
    const dispatch = useDispatch();
    const ref = useRef(null)

    const [, itemDrag] = useDrag({
        type: ITEM_TYPES.ITEM,
        item: { item, index }
    })

    const [, itemDrop] = useDrop({
        accept: ITEM_TYPES.ITEM,
        hover(item) {
            if (!item || item.index === index) {
                return;
            }
            dispatch(moveIngredientAction({from: item.index, to: index}));
            item.index = index;
        },
    })

    const deleteIngredient = () => {
        dispatch(deleteIngredientAction(item))
    }
    itemDrag(itemDrop(ref))

    return (
        <li className={constructorStyle.item} ref={ref}>
            <DragIcon type="primary"/>
            <ConstructorElement text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={isHover ? constructorStyle.wrapper__hover : ""}
                                handleClose={deleteIngredient}/>
        </li>
    )
}

ConstructorListItem.propTypes = {
    item: ingredientType.isRequired,
    index: PropTypes.number.isRequired,
    isHover: PropTypes.bool.isRequired
}

export default ConstructorListItem;