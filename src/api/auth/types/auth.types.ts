export type TLoginInput = {
    email: string
    password: string
}
export type TLoginOutput = {
    token: string
}

export interface IAuthService{
    login(loginInput: TLoginInput): Promise<TLoginOutput>
}