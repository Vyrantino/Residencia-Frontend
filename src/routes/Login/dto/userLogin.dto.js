export default class userLoginDto{
  constructor( usuario ){
      this.Username = usuario.Username ,
      this.Email = usuario.Email , 
      this.Password = usuario.Password 
  }
}

//   export default class userLoginDto{

//     Email? : string;
//     Username?: string ;
//     Password: string ; 
//  constructor( usuario: userLoginDto ){
//      this.Email = usuario.Email , 
//      this.Username = usuario.Username , 
//      this.Password = usuario.Password   
//  }
// }