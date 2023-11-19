import { useMemo } from "react";
import ingredientsStyle from './burger-ingredients.module.css'
import { CurrencyIcon, Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientElement(props) {
    return (
        <li className={ingredientsStyle.card} key={props.id}>
            <img
                className={"mb-2"}
                src={props.image}
                alt={props.name}
                width="240"
                height="120"
            ></img>
            <div className={ingredientsStyle.pricewrap + " mb-2"}>
              <span className={ingredientsStyle.price + " text text_type_digits-default" } >
                {props.price}
              </span>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={ ingredientsStyle.title + " text text_type_main-default"}>
                {props.name}
            </h3>
        </li>
    )
}

function BurgerIngredients(props) {
    const ingredients = props.ingredients;

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const onClickTab = (value) => {
    }

    return (
        <section className={ingredientsStyle.wrapper}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={ingredientsStyle.tabs + " mb-10"} >
                <Tab active={true} value={0} onClick={onClickTab(0)} >Булки</Tab>
                <Tab active={false} value={1} onClick={onClickTab(1)} >Соусы</Tab>
                <Tab active={false} value={2} onClick={onClickTab(2)} >Начинки</Tab>
            </div>
            <div className={ingredientsStyle.menu__wrapper + " mb-10"}>
                <div className={ingredientsStyle.menu}>
                    <div id="buns" >
                        <h2 className="text text_type_main-medium">Булки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {buns.length && buns.map((item) => (
                                <IngredientElement image={item.image}
                                                   name={item.name}
                                                   price={item.price}
                                                   type={item.type}
                                                   id={item._id} key={item._id} />
                                ))}
                        </ul>
                    </div>
                    <div id="sauces" >
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {sauces.length && sauces.map((item) => (
                                <IngredientElement image={item.image}
                                                   name={item.name}
                                                   price={item.price}
                                                   type={item.type}
                                                   id={item._id} key={item._id} />
                                ))}
                        </ul>
                    </div>
                    <div id="main">
                        <h2 className="text text_type_main-medium">Начинки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {mains.length && mains.map((item) => (
                                <IngredientElement image={item.image}
                                                   name={item.name}
                                                   price={item.price}
                                                   type={item.type}
                                                   id={item._id} key={item._id} />
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;