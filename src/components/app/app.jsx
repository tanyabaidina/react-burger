import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/use-modal";

function App() {
    const [currentIngredient, setCurrentIngredient] = useState({});

    const {isModalOpen: isIngredientDetailsModalOpen,
        openModal: openIngredientModal,
        closeModal: closeIngredientModal} = useModal(false);

    const {isModalOpen: isOrderDetailsModalOpen,
        openModal: openOrderModal,
        closeModal: closeOrderModel} = useModal(false);

    const handlerOpenIngredientModal = (item) => {
        setCurrentIngredient(item)
        openIngredientModal();
    }

    return (
        <div>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={appStyle.main}>
                    <div className={appStyle.wrapper}>
                        <BurgerIngredients onIngredientClick={handlerOpenIngredientModal}/>
                        <BurgerConstructor onClick={openOrderModal}/>
                        {isIngredientDetailsModalOpen &&
                            <Modal onClose={closeIngredientModal} header={"Детали ингредиента"}>
                                <IngredientDetails item={currentIngredient}/>
                            </Modal>}
                        {isOrderDetailsModalOpen &&
                            <Modal onClose={closeOrderModel} >
                                <OrderDetails />
                            </Modal>
                        }
                    </div>
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
