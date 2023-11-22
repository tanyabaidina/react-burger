import { useState, useEffect, SetStateAction} from 'react';
import appStyle from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

import { getIngredientsData } from "../../helpers/api";

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] = useState(false);
    const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState({});

    useEffect(() => {
        getIngredientsData()
            .then(res => {
                setIngredients(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const closeModal = () => {
        setIngredientDetailsModalOpen(false);
        setOrderDetailsModalOpen(false);
    }

    const openIngredientModal = (item) => {
        setCurrentIngredient(item)
        setIngredientDetailsModalOpen(true);
    }

    const openOrderModal = () => {
        setOrderDetailsModalOpen(true);
    }

    return (
        <div>
            <AppHeader />
            {ingredients.length > 0 &&
                <div className={appStyle.wrapper}>
                    <div className={appStyle.main}>
                        <BurgerIngredients ingredients={ingredients} onIngredientClick={openIngredientModal}/>
                        <BurgerConstructor ingredients={ingredients} onClick={openOrderModal}/>
                        {isIngredientDetailsModalOpen &&
                            <Modal onClose={closeModal} header={"Детали ингредиента"}>
                                <IngredientDetails item={currentIngredient}/>
                            </Modal>}
                        {isOrderDetailsModalOpen &&
                            <Modal onClose={closeModal} header={""}>
                                <OrderDetails />
                            </Modal>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default App;
