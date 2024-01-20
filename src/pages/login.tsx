import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import { useForm } from "../hooks/use-form";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {PasswordInput, Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyle from "./account.module.css"
import { loginUser } from "../services/actions/auth/login/login";
import { useAppDispatch } from "../services/store/store";

import { loginErrorSelector } from "../services/store/selectors";

export const LoganPage: FC = () => {
    const loginError =  useSelector(loginErrorSelector);
    const [error, setError] = useState("");
    const { form, formChange, isValid } = useForm({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        setError(loginError)
    }, [loginError]);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        formChange(e)
        setError("")
    }

    const sendLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) {
            return;
        }
        dispatch(loginUser({
            email: form.email,
            password: form.password
        }));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendLogin}>
                <h3 className='text text_type_main-medium'>Вход</h3>
                <EmailInput
                    name={"email"}
                    onChange={handleFormChange}
                    value={form.email || ""}
                    placeholder="Логин"
                    isIcon={false}
                />
                <PasswordInput
                    name={'password'}
                    onChange={handleFormChange}
                    value={form.password || ""}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
                {error !== "" && <p className={`text text_type_main-default ${loginStyle.error}`}>{error}</p> }
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