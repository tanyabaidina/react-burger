import { useState, useCallback } from "react";

interface IUseModal {
    isOpen: boolean
}
export const useModal = ({ isOpen }: IUseModal) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
         setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal
    };
};