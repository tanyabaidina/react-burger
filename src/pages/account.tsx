import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountStyle from "./account.module.css";
import { userLogout } from "../services/actions/auth/logout";
import {AppDispatch} from "../services/store";

function AccountPage() {
    const dispatch: AppDispatch = useDispatch();

    const userLogoutClick = () => {
        dispatch(userLogout())
    }

    return (
        <div className={AccountStyle.account__wrapper}>
            <div className={AccountStyle.menu}>
                <NavLink to={"/profile"}
                         end
                         className={({ isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }>
                    <p className="text text_type_main-medium">Профиль</p>
                </NavLink>
                <NavLink to={"/profile/orders"}
                         end
                         className={({ isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }>
                    <p className="text text_type_main-medium">История заказов</p>
                </NavLink>
                <NavLink to={"/"}
                         end
                         className={({ isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }
                         onClick={userLogoutClick}>
                    <p className="text text_type_main-medium">Выход</p>
                </NavLink>
                <p className="text text_type_main-default text_color_inactive pt-20">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <Outlet />
        </div>
    )
}

export default AccountPage;