import * as menutype from "../types/menu.type";
import Menu from '../../../Models/menu.model'
import { injectable } from "tsyringe";

@injectable()
export class MenuRepo implements menutype.IMenuRepo{
    async getAllMenu(category?: string): Promise<menutype.IMenuItem[] | null> {
        return await Menu.find({category: category})
    }
    async findMenuById(menuId: string): Promise<menutype.IMenuItem | null> {
        return await Menu.findById(menuId)
    }
    async deleteMenuById(menuId: string): Promise<void> {
        await Menu.findByIdAndDelete(menuId)
    }
    async createMenu(menu: menutype.TCreateMenuInput): Promise<menutype.IMenuItem> {
        return await Menu.create(menu)
    }
    async updateMenu(menuId: string, menuObject: menutype.TUpdateMenuItem): Promise<menutype.IMenuItem | null > {
        return await Menu.findByIdAndUpdate(menuId, menuObject, { new: true });
    }
}
