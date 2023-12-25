import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from './burger-ingredients.module.css'
import IngredientElement from "../ingredient-element/ingredient-element";
import {ITEM_TYPES, TABS} from "../../helpers/constants";
import { getIngredients } from "../../services/actions/burger-ingredients";

function BurgerIngredients({ onIngredientClick }) {
    const { ingredients, ingredientsRequest } = useSelector(store => store.burgerIngredients);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(TABS.BUNS);

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);
    const tabsRef = useRef(null)

    /*useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);*/

    const scrollHandler = () => {
        const elementBoundsArray = [
            {id: TABS.BUNS, bound: bunsRef.current.getBoundingClientRect().top},
            {id: TABS.SAUCES, bound: saucesRef.current.getBoundingClientRect().top},
            {id: TABS.MAINS, bound: mainsRef.current.getBoundingClientRect().top}
        ]
        const tabsBoundBottom = tabsRef.current.getBoundingClientRect().bottom;

        const minDistance = elementBoundsArray.reduce((accumulator, current) => {
            const diff = Math.abs(current.bound - tabsBoundBottom) -
                Math.abs(accumulator.bound - tabsBoundBottom);
            return diff > 0 ? accumulator : current;
        })

        setActiveTab(minDistance.id);
    }

    const onClickTab = (value) => {
        setActiveTab(value);
        const targetTab = document.getElementById(value);
        targetTab && targetTab.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className={ingredientsStyle.wrapper + " mt-10 pr-5 pl-5"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={ingredientsStyle.tabs + " mb-10"} ref={tabsRef}>
                <Tab active={activeTab === TABS.BUNS} value={TABS.BUNS} onClick={onClickTab} >Булки</Tab>
                <Tab active={activeTab === TABS.SAUCES} value={TABS.SAUCES} onClick={onClickTab} >Соусы</Tab>
                <Tab active={activeTab === TABS.MAINS} value={TABS.MAINS} onClick={onClickTab} >Начинки</Tab>
            </div>
            {!ingredientsRequest &&
            <div className={ingredientsStyle.menu__wrapper + " mb-10"} onScroll={scrollHandler}>
                <div className={ingredientsStyle.menu} >
                    <div id={TABS.BUNS} ref={bunsRef}>
                        <h2 className="text text_type_main-medium">Булки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {ingredients.bun?.length && ingredients.bun.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick} type={ITEM_TYPES.BUN}/>
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.SAUCES} ref={saucesRef}>
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {ingredients.sauce?.length && ingredients.sauce.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick} type={ITEM_TYPES.INGREDIENT} />
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.MAINS} ref={mainsRef}>
                        <h2 className="text text_type_main-medium">Начинки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {ingredients.main?.length && ingredients.main.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} onClick={onIngredientClick} type={ITEM_TYPES.INGREDIENT} />
                                </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div> }
        </section>
    )
}

BurgerIngredients.propTypes = {
    onIngredientClick: PropTypes.func.isRequired
};

export default BurgerIngredients;