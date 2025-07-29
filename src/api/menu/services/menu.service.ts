import { NotFoundError } from "../../../Utils/Error/CustomError"
import * as menutype from "../types/menu.type"
import {inject, injectable} from 'tsyringe'

@injectable()
export class MenuService implements menutype.IMenuService{
    constructor(@inject('IMenuRepo') private MenuRepo: menutype.IMenuRepo) { }
    
    async browseMenus(category?: string): Promise<menutype.TMenuItem[] | null> {
        const menuCategory = category
        let menus
        if (menuCategory) {
            menus = await this.MenuRepo.getAllMenu(category)
            if (menus?.length === 0) {
               throw new NotFoundError("Food Category not Found");
            }
            return menus
        }

        menus = await this.MenuRepo.getAllMenu()
        return menus
    }
    async createMenu(menu: menutype.TCreateMenuInput): Promise<menutype.TMenuItem> {
        const newMenu = await this.MenuRepo.createMenu(menu)

        return newMenu
    }
    async getMenuDetail(menuId: string): Promise<menutype.TMenuItem | null> {
        const menu = await this.MenuRepo.findMenuById(menuId)
        if (!menu) {
            throw new NotFoundError('Menu not found')
        }
        return menu
    }
    async updateMenu(menuId: string, menuObject: menutype.TUpdateMenuItem): Promise<menutype.TMenuItem> {
        const updatedMenu = await this.MenuRepo.updateMenu(menuId, menuObject)

        return updatedMenu as menutype.TMenuItem
    }
    async deleteMenu(menuId: string): Promise<void> {
        return  await this.MenuRepo.deleteMenuById(menuId)
    }
}