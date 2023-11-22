import { useMemo, useState } from "react";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from './burger-ingredients.module.css'
import IngredientElement from "../ingredient-element/ingredient-element";
import { ingredientType } from "../../helpers/types";
import { TABS } from "../../helpers/constants";

function BurgerIngredients({ ingredients, onIngredientClick }) {

    const [activeTab, setActiveTab] = useState(TABS.BUNS)

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);
    const onClickTab = (value) => {
        setActiveTab(value);
        const targetTab = document.getElementById(value);
        targetTab && targetTab.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className={ingredientsStyle.wrapper + " mt-10 pr-5 pl-5"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={ingredientsStyle.tabs + " mb-10"} >
                <Tab active={activeTab === TABS.BUNS} value={TABS.BUNS} onClick={onClickTab} >Булки</Tab>
                <Tab active={activeTab === TABS.SAUCES} value={TABS.SAUCES} onClick={onClickTab} >Соусы</Tab>
                <Tab active={activeTab === TABS.MAINS} value={TABS.MAINS} onClick={onClickTab} >Начинки</Tab>
            </div>
            <div className={ingredientsStyle.menu__wrapper + " mb-10"}>
                <div className={ingredientsStyle.menu}>
                    <div id={TABS.BUNS} >
                        <h2 className="text text_type_main-medium">Булки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {buns.length && buns.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick} />
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.SAUCES} >
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {sauces.length && sauces.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick} />
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.MAINS}>
                        <h2 className="text text_type_main-medium">Начинки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {mains.length && mains.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick}  />
                                </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    onIngredientClick: PropTypes.func.isRequired
};

export default BurgerIngredients;