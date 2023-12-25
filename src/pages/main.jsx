import appStyle from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';

function MainPage({handlerOpenIngredientModal, openOrderModal}) {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onIngredientClick={handlerOpenIngredientModal}/>
            <BurgerConstructor onClick={openOrderModal}/>
        </DndProvider>
    )
}

export default MainPage;
/*
* {isIngredientDetailsModalOpen &&
                        <Modal onClose={closeIngredientModal} header={"Детали ингредиента"}>
                            <IngredientDetails item={currentIngredient}/>
                        </Modal>}
                    {isOrderDetailsModalOpen &&
                        <Modal onClose={closeOrderModel}>
                            <OrderDetails/>
                        </Modal>
                    }*/