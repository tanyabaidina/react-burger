import detailsStyle from './ingredient-details.module.css';
import { ingredientType } from "../../helpers/types";

const IngredientDetails = ({ item }) => {
    const { image_large, name, calories, fat, proteins, carbohydrates } = item;
    return (
        <div className={detailsStyle.wrapper}>
            <img src={image_large} alt={name}/>
            <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
            <ul className={detailsStyle.list__wrapper + " mb-15"}>
                <li className={detailsStyle.list__item}>
                    <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>
                    <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
                </li>
                <li className={detailsStyle.list__item}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
                </li>
                <li className={detailsStyle.list__item}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
                </li>
                <li className={detailsStyle.list__item}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
};

IngredientDetails.propTypes = {
    item: ingredientType.isRequired
}

export default IngredientDetails;