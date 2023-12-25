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
import {Route, Routes} from "react-router-dom";
import LoganPage from "../../pages/login";
import MainPage from "../../pages/main";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import AccountPage from "../../pages/account";
import { AuthProtected, UnAuthProtected } from "../protected-route-element/protected-route-element";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {userData} from "../../services/actions/auth/user";

function App() {
    const dispatch = useDispatch();

    const [currentIngredient, setCurrentIngredient] = useState({});

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(userData());
    }, [dispatch])

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
            <main className={appStyle.main}>
                <div className={appStyle.wrapper}>
                    <Routes>
                        <Route path={"/login"} element={<UnAuthProtected component={<LoganPage />} />} />
                        <Route path={"/"} element={<MainPage handlerOpenIngredientModal={handlerOpenIngredientModal} openOrderModal={openOrderModal}/>} />
                        <Route path={"/register"} element={<UnAuthProtected component={ <RegisterPage />} />} />
                        <Route path={"/forgot-password"} element={<UnAuthProtected component={ <ForgotPasswordPage />}/>} />
                        <Route path={"/reset-password"} element={<UnAuthProtected component={<ResetPasswordPage />} />} />
                        <Route path={"/profile"} element={<AuthProtected component={<AccountPage />} />}>
                            <Route path={"/profile"} element={<ProfilePage />} />
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;

/*<DndProvider backend={HTML5Backend}>
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
            </DndProvider>*/
