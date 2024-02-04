import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import appStyle from './app.module.css';

import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";

import { LoganPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { AccountPage } from "../../pages/account";
import { OrdersHistoryPage } from "../../pages/orders-history/orders-history";
import { FourZeroFourPage } from "../../pages/four-zero-four/four-zero-four";

import { AuthProtected, UnAuthProtected } from "../protected-route-element/protected-route-element";
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";
import { userData } from "../../services/actions/auth/user/user";
import { useModal } from "../../hooks/use-modal";
import { useAppDispatch} from "../../services/store/store";
import { FeedPage } from "../../pages/feed-page/feed-page";
import { OrderInfoPopup } from "../order-info-popup/order-info-popup";


function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(userData());
    }, [dispatch])

    const { closeModal: closeIngredientModal} = useModal({ isOpen: false });

    const { openModal: openOrderModal, closeModal: closeOrderModel } = useModal({ isOpen: false} );

    const handleDetailsModalClose = () => {
        closeIngredientModal();
        navigate(-1);
    }

    const handleOrderModalClose = () => {
        closeOrderModel();
        navigate(-1);
    }

    const background = location.state && location.state.background;

    return (
        <div>
            <AppHeader />
            <main className={appStyle.main}>
                <div className={appStyle.wrapper}>
                    <Routes>
                        <Route path={"/login"} element={<UnAuthProtected component={<LoganPage />} />} />
                        <Route path={"/"} element={<MainPage openOrderModal={openOrderModal}/>} />
                        <Route path={"/register"} element={<UnAuthProtected component={ <RegisterPage />} />} />
                        <Route path={"/forgot-password"} element={<UnAuthProtected component={ <ForgotPasswordPage />}/>} />
                        <Route path={"/reset-password"} element={<UnAuthProtected checkStep={true}
                                                                                  component={<ResetPasswordPage />} />} />
                        <Route path={"/profile"} element={<AuthProtected component={<AccountPage />} />}>
                            <Route path={"/profile"} element={<ProfilePage />} />
                            <Route path={"/profile/orders"} element={<OrdersHistoryPage />} />
                        </Route>
                        <Route path={"/profile/orders/:id"} element={<AuthProtected component={<OrderInfoPopup />} />}/>
                        <Route path={"/ingredients/:id"} element={<IngredientDetails />}/>
                        <Route path={"/feed/:id"} element={<OrderInfoPopup />}/>
                        <Route path={"/orders"} element={<AuthProtected component={
                                   <Modal onClose={handleOrderModalClose} >
                                       <OrderDetails />
                                   </Modal>} /> }/>
                        <Route path={"/feed"} element={<FeedPage />} />
                        <Route path={"*"} element={<FourZeroFourPage />} />
                    </Routes>

                    {background && (
                        <Routes>
                            <Route path={"/ingredients/:id"}
                                element={
                                    <Modal onClose={handleDetailsModalClose} header={"Детали ингредиента"}>
                                        <IngredientDetails />
                                    </Modal>}
                            />
                            <Route path={"/feed/:id"}
                                   element={
                                       <Modal onClose={handleOrderModalClose}>
                                           <OrderInfoPopup />
                                       </Modal>
                                   }
                            />
                            <Route path={"/profile/orders/:id"}
                                   element={
                                       <Modal onClose={handleOrderModalClose}>
                                           <OrderInfoPopup />
                                       </Modal>
                                   }
                            />
                            <Route path={"/orders"}
                                element={<AuthProtected component={
                                    <Modal onClose={handleOrderModalClose} >
                                        <OrderDetails />
                                    </Modal>} />
                                }/>
                        </Routes>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
