import {NavLink, Outlet, useLocation} from "react-router-dom";

import AccountStyle from "./account.module.css";
import { userLogout } from "../services/actions/auth/logout/logout";
import { useAppDispatch} from "../services/store/store";
import { useEffect, useState } from "react";

export const AccountPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [text, setText] = useState("");

    useEffect(() => {
        if (location.pathname.includes("orders")) {
            setText("В этом разделе вы можете просмотреть свою историю заказов")
        } else if (location.pathname.includes("profile")) {
            setText("В этом разделе вы можете изменить свои персональные данные")
        } else {
            setText("")
        }
    }, [location]);

    const userLogoutClick = () => {
        dispatch(userLogout())
    }

    return (
        <div className={AccountStyle.account__wrapper}>
            <div className={AccountStyle.menu}>
                <NavLink to={"/profile"}
                         end
                         className={({isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }>
                    <p className="text text_type_main-medium">Профиль</p>
                </NavLink>
                <NavLink to={"/profile/orders"}
                         end
                         className={({isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }>
                    <p className="text text_type_main-medium">История заказов</p>
                </NavLink>
                <NavLink to={"/"}
                         end
                         className={({isActive}) =>
                             `${AccountStyle.menu__link} ${isActive ? AccountStyle.menu__active__link : ''}`
                         }
                         onClick={userLogoutClick}>
                    <p className="text text_type_main-medium">Выход</p>
                </NavLink>
                <p className="text text_type_main-default text_color_inactive pt-20">
                    {text}
                </p>
            </div>
            <Outlet/>
        </div>
    )
}