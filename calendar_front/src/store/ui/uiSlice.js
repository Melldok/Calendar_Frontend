import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,

    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
            
            // with normal redux (without toolkit)
            // return{
            //     ...state,
            //     isDateModalOpen: true
            // }
        },
        onCLoseDateModal: (state) => {
            state.isDateModalOpen = false            
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCLoseDateModal } = uiSlice.actions;