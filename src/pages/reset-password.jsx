import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import loginStyle from "./account.module.css"
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../services/actions/account/reset-password";
import {useForm} from "../hooks/use-form";

function ResetPasswordPage() {
    const { resetPasswordSuccess } =  useSelector((store) => store.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { form, isValid, formChange } = useForm({});

    useEffect(() => {
        if (resetPasswordSuccess) {
            navigate("/login");
        }
    }, [resetPasswordSuccess]);
    const sendResetPassword = (e) => {
        e.preventDefault();
        if (!isValid()) {
            return;
        }
        dispatch(resetPassword({
            password: form.password,
            token: form.token
        }));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendResetPassword}>
                <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
                <PasswordInput
                    name={'password'}
                    onChange={formChange}
                    value={form.password || ""}
                    placeholder="Введите новый пароль"

                />
                <Input
                    name={"token"}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={form.token || ""}
                    onChange={formChange}
                    size={'default'}
                />
                <Button htmlType="submit" type="primary" size="medium">
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