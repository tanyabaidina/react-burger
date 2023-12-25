import loginStyle from "./account.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../services/actions/auth/register";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const sendRegister = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            return;
        }
        dispatch(registerUser({name, email, password}));
    }

    return (
        <div>
            <form className={loginStyle.wrapper} onSubmit={sendRegister}>
                <h3 className='text text_type_main-medium'>Регистрация</h3>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={(e) => {setName(e.target.value)}}
                    value={name}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email}
                    placeholder="E-main"
                    isIcon={false}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                    name={'password'}
                    placeholder="Пароль"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-10 mr-4">
                    Зарегистрироваться
                </Button>
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