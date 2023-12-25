import loginStyle from "./account.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { resetPassword } from "../services/actions/account/reset-password";

function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const sendResetPassword = (e) => {
        e.preventDefault();
        if (password === "" || token === "") {
            return;
        }
        dispatch(resetPassword({password, token}));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendResetPassword}>
                <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
                <PasswordInput
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    placeholder="Введите новый пароль"

                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={token}
                    onChange={(e) => {
                        setToken(e.target.value)}}
                    size={'default'}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-10 mr-4">
                    Сохранить
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

export default ResetPasswordPage;