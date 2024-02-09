import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css'
import { NavLink } from "react-router-dom";

function AppHeader() {
    const getClass = (isActive: boolean) => {
        if (isActive)
            return `text text_type_main-default ml-2 ${headerStyle.active}`;
        else
            return "text text_type_main-default text_color_inactive ml-2"
    }

    return (
        <header className={headerStyle.header + " pb-4 pt-4"}>
            <div className={headerStyle.wrapper}>
                <div className={headerStyle.nav__wrapper}>
                    <nav className={headerStyle.nav}>
                        <NavLink to={"/"} className={headerStyle.link + " pl-5 pr-5 pb-4 pt-4"}>
                            {({ isActive }) => (
                                <>
                                    <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                    <p className={getClass(isActive)}>Конструктор</p>
                                </>
                            )}
                        </NavLink>
                        <NavLink to={"/feed"} className={headerStyle.link + " pl-5 pr-5 pb-4 pt-4"}>
                            {({ isActive }) => (
                                <>
                                    <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                    <p className={getClass(isActive)}>Лента заказов</p>
                                </>
                            )}
                        </NavLink>
                    </nav>
                </div>
                <NavLink to={"/"} >
                    <Logo />
                </NavLink>
                <div className={headerStyle.profile__wrapper}>
                    <NavLink to={"/profile"} className={headerStyle.link} >
                        {({ isActive }) => (
                            <>
                                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                                <p className={getClass(isActive)}>Личный кабинет</p>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;