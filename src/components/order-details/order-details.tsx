import orderStyle from './order-details.module.css';
import doneImage from '../../images/order-done.svg'
import Preloader from "../preloader/preloader";
import { orderDetailsSelector } from "../../services/store/selectors";
import { useAppSelector } from "../../services/store/store";

const OrderDetails = () => {
    const { order, orderDetailsRequest } = useAppSelector(orderDetailsSelector);

    if (orderDetailsRequest)
        return (
            <div className={orderStyle.wrapper}>
                <Preloader/>
                <p className='text text_type_main-medium mt-15 mb-2'>Отправляем заказ...</p>
            </div>
        )

    return (
        <div className={orderStyle.wrapper + " mt-30"}>
            {!orderDetailsRequest &&
                <>
                    <h2 className={orderStyle.number__wrapper + ' text text_type_digits-large mb-8'}>{order}</h2>
                    <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                    <img src={doneImage} alt='Ваш заказ начали готовить'/>
                    <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
                    <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на
                        орбитальной станции</p>
                </>}
        </div>
    )
}

export default OrderDetails;