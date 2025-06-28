import { injectable } from 'tsyringe'
export interface IUserService {
    getUser(id: string): Promise<void>
    creaeteUser(data: string): Promise<void>
}

@injectable()
export class UserService implements IUserService{
    async getUser(id: string): Promise<void> {
        
    }

    async creaeteUser(data: string): Promise<void> {
        
    }
}