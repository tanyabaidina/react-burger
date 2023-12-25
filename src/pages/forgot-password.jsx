import loginStyle from "./account.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { forgotPassword } from "../services/actions/account/forgot-password";


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const sendForgotPassword = (e) => {
        e.preventDefault();
        if (email === "") {
            return;
        }
        dispatch(forgotPassword({email}));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendForgotPassword}>
                <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
                <EmailInput
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email}
                    placeholder="Укажите e-main"
                    isIcon={false}
                    extraClass="mb-2"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-10 mr-4">
                    Восстановить
                </Button>
                <div className={loginStyle.footer}>
                    <div className={loginStyle.text}>
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                        <Link to={"/login"} className={loginStyle.link}>
                            Войти
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;