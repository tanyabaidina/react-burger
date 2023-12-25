import {useState} from "react";

export const useForm = (formValues = {}) => {
    const [form, updateForm] = useState(formValues);

    const formChange = (e) => {
        const { value, name } = e.target;
        updateForm({...form, [name]: value});
    }

    return { form, updateForm, formChange };
}