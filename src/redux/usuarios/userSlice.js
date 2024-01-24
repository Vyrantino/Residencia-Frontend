import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice( {
    name: 'usersSlice' , 
    initialState: {
        usuario: [],
    },
    // initialState: {
    //     idUsuario: null ,
    //     NombreUsuario: null , 
    //     Rol: null 
    // },
    reducers: {
        actionLogin: ( state , action ) =>{
            state.usuario = action.payload ; 
        },
        actionLogOut: ( state ) =>{
            state.usuario = [] ; 
        },
    }
} ) ;

export const { actionLogin , actionLogOut } = usersSlice.actions ;

export default usersSlice.reducer ; 