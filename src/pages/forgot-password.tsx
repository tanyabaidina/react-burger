import { Link, useNavigate } from "react-router-dom";
import {FC, FormEvent, useEffect, useState} from "react";
import { useSelector } from "react-redux";

import loginStyle from "./account.module.css"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { forgotPassword } from "../services/actions/account/forgot-password/forgot-password";
import { useAppDispatch } from "../services/store/store";

import { forgotPasswordSuccessSelector } from "../services/store/selectors";

export const ForgotPasswordPage: FC = () => {
    const forgotPasswordSuccess =  useSelector(forgotPasswordSuccessSelector);
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (forgotPasswordSuccess) {
            navigate("/reset-password");
        }
    }, [forgotPasswordSuccess]);

    const sendForgotPassword = (e: FormEvent<HTMLFormElement>) => {
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
                <Button htmlType="submit" type="primary" size="medium">
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