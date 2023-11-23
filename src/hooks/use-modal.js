import { useState, useCallback } from "react";

export const useModal = ({ isOpen }) => {
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