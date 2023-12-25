import {PasswordInput, Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

import loginStyle from "./account.module.css"
import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/actions/auth/login";

function LoganPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const sendLogin = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            return;
        }
        dispatch(loginUser({ email, password }));
    }


    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendLogin}>
                <h3 className='text text_type_main-medium'>Вход</h3>
                <EmailInput
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email}
                    placeholder="Логин"
                    isIcon={false}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-10 mr-4">
                    Войти
                </Button>
                <div className={loginStyle.footer}>
                    <div className={loginStyle.text}>
                        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                        <Link to={"/register"} className={loginStyle.link}>
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div className={loginStyle.text}>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                        <Link to={"/forgot-password"} className={loginStyle.link}>
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoganPage;