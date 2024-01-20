import dropzoneStyle from './element-dropzone.module.css';

interface IElementDropzone {
    type: string;
    text: string;
    isHover: boolean;
    warning?: boolean;
}

const ElementDropzone = ({type, text, isHover, warning} : IElementDropzone) => {
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

export default ElementDropzone;