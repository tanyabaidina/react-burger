import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import constructorStyle from "../burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    deleteIngredientAction,
    moveIngredientAction
} from "../../../services/actions/burger-constructor";
import { IIngredientDnD } from "../../../helpers/types";
import { ITEM_TYPES } from "../../../helpers/constants";
import { AppDispatch } from "../../../services/store";

interface IConstructorListItemProps {
    item: IIngredientDnD,
    index: number,
    isHover: boolean
}
type TDnDObject = {
    item: IIngredientDnD
    index: number
}

function ConstructorListItem({ item, index, isHover } : IConstructorListItemProps) {
    const dispatch : AppDispatch = useDispatch();
    const ref = useRef<HTMLLIElement | null>(null)

    const [, itemDrag] = useDrag<TDnDObject>({
        type: ITEM_TYPES.ITEM,
        item: { item, index }
    })

    const [, itemDrop] = useDrop<TDnDObject>({
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

export default ConstructorListItem;