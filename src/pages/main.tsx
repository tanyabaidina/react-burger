import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

interface IMainPage {
    openOrderModal: () => void;
}
export const MainPage = ({openOrderModal} : IMainPage) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor onClick={openOrderModal}/>
        </DndProvider>
    )
}