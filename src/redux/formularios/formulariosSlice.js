import { createSlice } from "@reduxjs/toolkit";

export const formulariosSlice = createSlice( {
    name: 'formulariosSlice' , 
    initialState: {
        formularios: [] ,
    },
    reducers: {
        loadFormularios: ( state , action ) =>{
            state.formularios = action.payload 
        },
    }
} ) ;

export const { loadFormularios } = formulariosSlice.actions ;

export default formulariosSlice.reducer ; 