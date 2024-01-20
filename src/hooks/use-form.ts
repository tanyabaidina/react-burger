import { useState, ChangeEvent } from "react";

interface IForm {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
}

export const useForm = (formValues: IForm = {}) => {
    const [form, updateForm] = useState(formValues);

    const formChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        updateForm({...form, [name]: value});
    }

    const isValid = (): boolean => {
        for (const [key, value] of Object.entries(form)) {
            if (value === "") return false
        }
        return true;
    }

    return { form, updateForm, formChange, isValid };
}