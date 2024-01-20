import { useEffect, useState, ChangeEvent, FormEvent, FC } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/use-form";

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyle from "./account.module.css";
import { updateUserData } from "../services/actions/auth/user/user";
import { useAppDispatch } from "../services/store/store";
import { userDataSelector} from "../services/store/selectors";

export const ProfilePage: FC = () =>  {
    const { name, email } =  useSelector(userDataSelector);
    const [visibleButtons, setVisibleButtons] = useState(false);
    const { form, updateForm, formChange } = useForm({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        updateForm({
            name: name,
            email: email,
            password: ""
        })
    }, [name, email])

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        formChange(e);
        setVisibleButtons(true);
    }

    const handleUpdateUserData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserData({
            name: form.name,
            email: form.email,
            password: form.password
        }))
        setVisibleButtons(false)
    }

    const removeChanges = () => {
        updateForm({
            name: name,
            email: email,
            password: ""
        })
        setVisibleButtons(false)
    }

    return (
        <div>
            <form className={loginStyle.profile__info} onSubmit={handleUpdateUserData}>
                <Input
                    name={"name"}
                    type={"text"}
                    value={form.name || ""}
                    onChange={handleFormChange}
                    placeholder={"Имя"}
                    icon={"EditIcon"}
                />
                <EmailInput
                    onChange={handleFormChange}
                    value={form.email || ""}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                />
                <PasswordInput
                    onChange={handleFormChange}
                    value={form.password || ""}
                    name={'password'}
                    placeholder="Пароль"
                    icon="EditIcon"
                />
                { visibleButtons &&
                <div className={loginStyle.profile__buttons}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={removeChanges}>
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>}
            </form>
        </div>
    )
}