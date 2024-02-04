import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useForm } from "../hooks/use-form";
import { Link } from "react-router-dom";

import loginStyle from "./account.module.css"
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../services/actions/auth/register/register";
import { useAppDispatch, useAppSelector } from "../services/store/store";

import { registerErrorSelector } from "../services/store/selectors";

export const RegisterPage: FC = () => {
    const registerError=  useAppSelector(registerErrorSelector);
    const [error, setError] = useState("");
    const { form, formChange, isValid } = useForm({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        setError(registerError)
    }, [registerError]);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        formChange(e)
        setError("")
    }

    const sendRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) {
            return;
        }
        dispatch(registerUser({
            name: form.name,
            email: form.email,
            password: form.password
        }));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendRegister}>
                <h3 className='text text_type_main-medium'>Регистрация</h3>
                <Input
                    name={"name"}
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleFormChange}
                    value={form.name || ""}
                    size={'default'}
                    error={form.name === ""}
                    errorText={"Не может быть пустым"}
                />
                <EmailInput
                    name={"email"}
                    onChange={handleFormChange}
                    value={form.email || ""}
                    placeholder="E-main"
                    isIcon={false}
                />
                <PasswordInput
                    onChange={formChange}
                    value={form.password || ""}
                    name={'password'}
                    placeholder="Пароль"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                {error !== "" && <p className={`text text_type_main-default ${loginStyle.error}`}>{error}</p> }
                <div className={loginStyle.footer}>
                    <div className={loginStyle.text}>
                        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                        <Link to={"/login"} className={loginStyle.link}>
                            Войти
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}