import PropTypes from "prop-types";
import dropzoneStyle from './element-dropzone.module.css';

const ElementDropzone = ({type, text, isHover, warning}) => {
    let extraClass = '';
    if (type === "top") {
        extraClass = dropzoneStyle.top
    } else if (type === "bottom") {
        extraClass = dropzoneStyle.bottom
    } else {
        extraClass = "ml-8"
    }

    const hoverClass = isHover ? dropzoneStyle.wrapper__hover : '';
    const warningClass = warning ? dropzoneStyle.wrapper__warning : '';

    return (
        <div className={[dropzoneStyle.wrapper, extraClass, hoverClass, warningClass].join(" ")}>
            <span className="text text_type_main-default text_color_inactive">{text}</span>
        </div>
    )
}

ElementDropzone.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isHover: PropTypes.bool.isRequired
}

export default ElementDropzone;