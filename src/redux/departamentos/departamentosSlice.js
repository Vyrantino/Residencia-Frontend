import { createSlice } from "@reduxjs/toolkit";

export const departamentosSlice = createSlice( {
    name: 'departamentosSlice' , 
    initialState: {
        departamento: [] ,
    },
    reducers: {
        loadDepartamento: ( state , action ) =>{
            state.departamento = action.payload 
        },
    }
} ) ;

export const { loadDepartamento } = departamentosSlice.actions ;

export default departamentosSlice.reducer ; 