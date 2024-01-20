import notFoundStyle from './four-zero-four.module.css';

export const FourZeroFourPage = () => {
    return (
        <div className={notFoundStyle.wrapper}>
            <h1 className={`text text_type_digits-large ${notFoundStyle.number}`}>404</h1>
            <p className="text text_type_main-large text_color_inactive">Oops... page not found</p>
        </div>
    )
}