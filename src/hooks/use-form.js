import { useState } from "react";

export const useForm = (formValues = {}) => {
    const [form, updateForm] = useState(formValues);

    const formChange = (e) => {
        const { value, name } = e.target;
        updateForm({...form, [name]: value});
    }

    const isValid = () => {
        for (const [key, value] of Object.entries(form)) {
            if (value === "") return false
        }
        return true;
    }

    return { form, updateForm, formChange, isValid };
}