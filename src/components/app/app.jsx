import { useState, useEffect } from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/use-modal";

import { getIngredientsData } from "../../helpers/api";

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState({});

    const {isModalOpen: isIngredientDetailsModalOpen,
        openModal: openIngredientModal,
        closeModal: closeIngredientModal} = useModal(false);

    const {isModalOpen: isOrderDetailsModalOpen,
        openModal: openOrderModal,
        closeModal: closeOrderModel} = useModal(false);

    useEffect(() => {
        getIngredientsData()
            .then(res => {
                setIngredients(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handlerOpenIngredientModal = (item) => {
        setCurrentIngredient(item)
        openIngredientModal();
    }

    return (
        <div>
            <AppHeader />
            {ingredients.length > 0 &&
                <main className={appStyle.main}>
                    <div className={appStyle.wrapper}>
                        <BurgerIngredients ingredients={ingredients} onIngredientClick={handlerOpenIngredientModal}/>
                        <BurgerConstructor ingredients={ingredients} onClick={openOrderModal}/>
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
            }
        </div>
    );
}

export default App;
