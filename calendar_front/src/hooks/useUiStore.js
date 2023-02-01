// Hook donde pondremos todas las funciones que llaman a nuestro store y hacen el dispatch de sus reducers

import { useDispatch, useSelector } from "react-redux"
import { onCLoseDateModal, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {

    const dispatch = useDispatch()
    
    const {isDateModalOpen} = useSelector(state => state.ui) 


    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCLoseDateModal())
    }

    return {
        // Propiedades
        isDateModalOpen,
        //Metodos
        openDateModal,
        closeDateModal
    }
}

