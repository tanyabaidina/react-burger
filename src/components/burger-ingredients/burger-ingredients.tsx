import { useState, useRef } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from './burger-ingredients.module.css'

import IngredientElement from "../ingredient-element/ingredient-element";
import { burgerIngredientsSelector } from "../../services/store/selectors";
import { useAppSelector } from "../../services/store/store";

import { ITEM_TYPES, TABS } from "../../helpers/constants";

function BurgerIngredients() {
    const { ingredients, ingredientsRequest } = useAppSelector(burgerIngredientsSelector);
    const [activeTab , setActiveTab] = useState<keyof typeof TABS>(TABS.BUNS);

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null)

    const scrollHandler = () => {
        const elementBoundsArray = [
            {id: TABS.BUNS, bound: bunsRef.current?.getBoundingClientRect().top || 0},
            {id: TABS.SAUCES, bound: saucesRef.current?.getBoundingClientRect().top || 0},
            {id: TABS.MAINS, bound: mainsRef.current?.getBoundingClientRect().top || 0}
        ]
        const tabsBoundBottom = tabsRef.current?.getBoundingClientRect().bottom || 0;

        const minDistance = elementBoundsArray.reduce((accumulator, current) => {
            const diff = Math.abs(current.bound - tabsBoundBottom) -
                Math.abs(accumulator.bound - tabsBoundBottom);
            return diff > 0 ? accumulator : current;
        })

        setActiveTab(minDistance.id);
    }

    const onClickTab = (value : string) => {
        setActiveTab(value as keyof typeof TABS);
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
                                    <IngredientElement item={item} type={ITEM_TYPES.BUN}/>
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.SAUCES} ref={saucesRef}>
                        <h2 className="text text_type_main-medium">Соусы</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {ingredients.sauce?.length && ingredients.sauce.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} type={ITEM_TYPES.INGREDIENT} />
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div id={TABS.MAINS} ref={mainsRef}>
                        <h2 className="text text_type_main-medium">Начинки</h2>
                        <ul className={ingredientsStyle.list + " pt-6 pb-15"} >
                            {ingredients.main?.length && ingredients.main.map((item) => (
                                <li key={item._id}>
                                    <IngredientElement item={item} type={ITEM_TYPES.INGREDIENT} />
                                </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div> }
        </section>
    )
}

export default BurgerIngredients;