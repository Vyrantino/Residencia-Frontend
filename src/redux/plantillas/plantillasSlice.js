import { createSlice } from "@reduxjs/toolkit";

export const plantillasSlice = createSlice( {
    name: 'plantillasSlice' , 
    initialState: {
        plantilla: [] ,
    },
    reducers: {
        loadPlantilla: ( state , action ) =>{
            state.plantilla = action.payload 
        },
    }
} ) ;

export const { loadPlantilla } = plantillasSlice.actions ;

export default plantillasSlice.reducer ; 