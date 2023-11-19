import constructorStyle from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useMemo} from "react";

function BurgerConstructor(props) {
    const ingredients = props.ingredients;

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);

    const topBun = buns[0];
    const bottomBun = buns[1];

    const otherIngredients = [mains[1], mains[0], mains[3], mains[5], mains[6], sauces[0]];


    return (
        <section className={constructorStyle.wrapper}>
            <div className={constructorStyle.list__wrapper}>
                <div className={constructorStyle.lonely__buns}>
                    {topBun && (<ConstructorElement type="top"
                                                    isLocked={true}
                                                    text={topBun.name + " (верх)"}
                                                    price={topBun.price}
                                                    thumbnail={topBun.image} />
                    )}
                </div>
                <div className={constructorStyle.items__wrapper}>
                    <div className={constructorStyle.list}>
                        {otherIngredients.length > 0 && otherIngredients.map((item) => (
                            <div className={constructorStyle.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={item.name}
                                                    price={item.price}
                                                    thumbnail={item.image} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={constructorStyle.lonely__buns}>
                    {bottomBun && (<ConstructorElement type="bottom"
                                                       isLocked={true}
                                                       text={bottomBun.name + " (низ)"}
                                                       price={bottomBun.price}
                                                       thumbnail={bottomBun.image} />
                    )}
                </div>
                <div className={constructorStyle.order}>
                    <p className="text text_type_digits-medium pr-1">800</p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;
