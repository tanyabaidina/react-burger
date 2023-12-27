import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/use-form";
import { Link } from "react-router-dom";

import loginStyle from "./account.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../services/actions/auth/register";

function RegisterPage() {
    const { registerError } =  useSelector((store) => store.userData);
    const [error, setError] = useState("");
    const { form, formChange, isValid } = useForm({});
    const dispatch = useDispatch();

    useEffect(() => {
        setError(registerError)
    }, [registerError]);

    const handleFormChange = (e) => {
        formChange(e)
        setError("")
    }

    const sendRegister = (e) => {
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
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-10 mr-4">
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

export default RegisterPage;