import { TUserOutput } from "../../user/types/user.types"


export type TLoginInput = {
    email: string
    password: string
}
export type TLoginOutput =  TUserOutput

export interface IAuthService{
    login(loginInput: TLoginInput): Promise<TLoginOutput>
}