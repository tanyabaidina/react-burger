import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMemo, useEffect } from "react";

import detailsStyle from './ingredient-details.module.css';
import { setCurrentIngredient } from "../../services/actions/burger-ingredients";

const IngredientDetails = () => {
    const { ingredients, currentIngredient, ingredientsRequest } = useSelector(store => store.burgerIngredients);
    const { id } = useParams();
    const dispatch = useDispatch();

    const getCurrentIngredient = (ingredients, id) => {
        let ingredient = null;
        ["bun", "main", "sauce"].forEach((key) => {
            const temp = key in ingredients && ingredients[key].find((item) => item._id === id)
            if (temp) ingredient = temp;
        })
        return ingredient;
    }

    const _currentIngredient = useMemo(() => getCurrentIngredient(ingredients, id),[id, ingredients])

    useEffect(() => {
        if (_currentIngredient) {
            dispatch(setCurrentIngredient(_currentIngredient))
        }
    }, [dispatch, _currentIngredient]);

    if (ingredientsRequest)
        return (
            <div className={detailsStyle.wrapper}>
                <p className='text text_type_main-medium'>
                    Пожалуйста, подождите...
                </p>
            </div>
        )

    else if (currentIngredient)
        return (
            <div className={detailsStyle.wrapper}>
                <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
                <p className='text text_type_main-medium mt-4 mb-8'>{currentIngredient.name}</p>
                <ul className={detailsStyle.list__wrapper + " mb-15"}>
                    <li className={detailsStyle.list__item}>
                        <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>
                        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.calories}</span>
                    </li>
                    <li className={detailsStyle.list__item}>
                        <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.proteins}</span>
                    </li>
                    <li className={detailsStyle.list__item}>
                        <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.fat}</span>
                    </li>
                    <li className={detailsStyle.list__item}>
                        <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        )
};

export default IngredientDetails;