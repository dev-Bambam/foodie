import * as usertype from '../types/user.types'
import * as menutype from '../../menu/types/menu.type'
import * as ordertype from '../../order/types/order.type'
import { injectable, inject } from 'tsyringe'

@injectable()
export class AdminService implements usertype.IAdminService{
    constructor(
        @inject('IMenuService') private MenuService: menutype.IMenuService,
        @inject('IOderService') private OrderService: ordertype.IOrderService,
        @inject('IUserRepo') private UserRepo: usertype.IUserRepository
    ) { }
    
    async createMenu(menuInput: menutype.TCreateMenuInput): Promise<menutype.IMenuItem> {
        const newMenu = await this.MenuService.createMenu(menuInput)

        return newMenu
    };

    async getAllCustomers(): Promise<usertype.TCustomer[]> {
        const customers = await this.UserRepo.fetchAllCustomer()

        return customers
    }
    
}

