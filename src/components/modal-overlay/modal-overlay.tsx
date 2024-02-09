import overlayStyle from './modal-overlay.module.css';

interface IModalOverlay {
    onClose: () => void
}

const ModalOverlay = ({ onClose } : IModalOverlay) => {

    return (
        <div className={overlayStyle.background} onClick={onClose}></div>
    )
}

export default ModalOverlay;