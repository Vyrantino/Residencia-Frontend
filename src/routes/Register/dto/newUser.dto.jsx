export default class NewUserDto{
    constructor( usuario ) {
        this.NombreUsuario = usuario.NombreUsuario ;
        this.Rol = usuario.Rol ; 
        this.Contraseña = usuario.Contraseña ;  
    }
}