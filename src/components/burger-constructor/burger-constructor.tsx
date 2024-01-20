import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import constructorStyle from './burger-constructor.module.css'

import { ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { addBunAction, addIngredientAction } from "../../services/actions/burger-constructor/burger-constructor-action-creators";
import { getOrderDetails } from "../../services/actions/order-details/order-details";
import { ITEM_TYPES } from "../../helpers/constants";

import ElementDropzone from "./element-dropzone/element-dropzone";
import ConstructorListItem from "./constructor-list-item/constructor-list-item";
import { useAppDispatch } from "../../services/store/store";
import { burgerConstructorSelector, isAuthSelector } from "../../services/store/selectors";

import { IIngredientDnD } from "../../helpers/types"

interface IBurgerConstructorProps {
    onClick: () => void;
}

function BurgerConstructor({ onClick } : IBurgerConstructorProps) {
    const { bun, ingredients } = useSelector(burgerConstructorSelector);
    const isAuth =  useSelector(isAuthSelector);
    const dispatch = useAppDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const pricesArray = [...[bun, bun], ...ingredients].map( (item: IIngredientDnD | null) => item?.price );
        const _totalPrice  = pricesArray.reduce((prev, cur) => {
            return ((prev || 0) + (cur || 0))
        }, 0) || 0;
        setTotalPrice(_totalPrice);
    }, [bun, ingredients]);

    const [{ isBunHover }, dropBun] = useDrop(() => ({
        accept: ITEM_TYPES.BUN,
        drop: (item: IIngredientDnD) => {
            dispatch(addBunAction(item))
        },
        collect: (monitor) => ({
            isBunHover: monitor.isOver(),
        }),
    }))

    const [{ isHover }, drop] = useDrop(() => ({
        accept: ITEM_TYPES.INGREDIENT,
        drop: (item: IIngredientDnD) => {
            dispatch(addIngredientAction({ ...item, count: item.count += 1, uniqId: uuidv4()}))
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    }))

    const orderHandler = () => {
        if (isAuth) {
            if (bun && ingredients.length > 0) {
                navigate("/orders");
                const data = [bun, ...ingredients, bun].map(item => item?._id);
                dispatch(getOrderDetails(data));
                onClick();
            } else {
                setWarning(true)
                setTimeout(() => {
                    setWarning(false)
                }, 800);
            }
        } else {
            navigate("/login");
        }
    }

    return (
        <section className={constructorStyle.wrapper + " pr-5 pl-5"}>
            <div className={"pl-4 pr-8 pt-25"} ref={dropBun}>
                <div className={"pl-8 pt-4 pb-2"} >
                    {bun ?
                        <ConstructorElement type="top"
                                            isLocked={true}
                                            text={bun.name + " (верх)"}
                                            price={bun.price}
                                            thumbnail={bun.image}
                                            extraClass={isBunHover ? constructorStyle.wrapper__hover : ""}/> :
                        <ElementDropzone type="top" text={'Выберете булку'} isHover={isBunHover} warning={warning}/>
                    }
                </div>
                <div className={constructorStyle.items__wrapper + " pt-2 pb-2 pr-2"} ref={drop}>
                    <ul className={constructorStyle.list}>
                        {ingredients.length > 0 ? ingredients.map((item, index) => (
                            <ConstructorListItem item={item}
                                                 index={index}
                                                 isHover={isHover}
                                                 key={item.uniqId}/>
                        )) : <ElementDropzone type="" text={'Выберете начинку'} isHover={isHover} warning={warning}/> }
                    </ul>
                </div>
                <div className={"pl-8 pt-2 pb-4"} >
                    { bun ? <ConstructorElement type="bottom"
                                                isLocked={true}
                                                text={bun.name + " (низ)"}
                                                price={bun.price}
                                                thumbnail={bun.image}
                                                extraClass={isBunHover ? constructorStyle.wrapper__hover : ""}/> :
                        <ElementDropzone type="bottom" text={'Выберете булку'} isHover={isBunHover} warning={warning}/>
                    }
                </div>
                <div className={constructorStyle.order + " pt-10 pb-10"}>
                    <p className="text text_type_digits-medium pr-1">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4" onClick={orderHandler}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;
