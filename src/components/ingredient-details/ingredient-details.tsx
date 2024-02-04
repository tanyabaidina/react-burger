import { useParams } from "react-router-dom";
import { useMemo, useEffect, JSX } from "react";

import detailsStyle from './ingredient-details.module.css';
import { setCurrentIngredient } from "../../services/actions/burger-ingredients/burger-ingredients-action-creators";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { burgerIngredientsSelector } from "../../services/store/selectors";

const IngredientDetails = (): JSX.Element => {
    const { currentIngredient,
            ingredientsRequest,
            ingredientsMap } = useAppSelector(burgerIngredientsSelector);

    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();

    const _currentIngredient = useMemo(() =>
        (id && ingredientsMap?.get(id)) || null,
        [id, ingredientsMap])

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

    return (<></>)
};

export default IngredientDetails;