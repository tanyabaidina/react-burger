import {JSX, PropsWithChildren, useEffect} from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyle from './modal.module.css';

interface IModal {
    onClose: () => void;
    header?: string
}

const rootModal = document.getElementById("modal-root");
const Modal = ({ children, onClose, header } : PropsWithChildren<IModal>): JSX.Element => {

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            e.key === "Escape" && onClose()
        }
        window.addEventListener('keydown', close)
        return () => {
            window.removeEventListener('keydown', close)
        }
    },[]);

    if (rootModal === null)
        return (<></>)

    return createPortal(
        (<>
            <div className={modalStyle.wrapper} >
                {header &&
                    <div className={modalStyle.header__wrapper + " mt-10 ml-10 mr-10"} >
                        <h3 className='text text_type_main-large'>{header}</h3>
                    </div>}
                <button className={modalStyle.close__button + " mt-15 mr-10"} onClick={onClose}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </>), rootModal) as JSX.Element;
}

export default Modal;