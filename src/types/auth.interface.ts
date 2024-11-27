import { IUser } from "./user.interface"

export interface IEmailPassword {
   email: string   
   password: string
}         

export interface ITokens {
   accessToken: string   
   refreshToken: string         
}   

export interface IAUthRegister {
   email: string   
   password: string
   name?: string   
}

export interface IAuthResponse extends ITokens {
   user: IUser
}

export interface IRegisterForm {
   name: string
   email: string
   password: string
}