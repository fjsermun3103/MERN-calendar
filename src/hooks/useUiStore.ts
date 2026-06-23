
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";


export const useUiStore = () => {
    
    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector((state:RootState) => state.ui);


    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return {
        //* Properties
        isDateModalOpen,


        //* Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,

    }
}