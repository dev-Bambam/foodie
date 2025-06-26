import { Document, Types } from "mongoose";

export interface IMenuItem extends Document {
   name: string;
   description: string;
   price: number;
   category: string;
   imageUrl?: string;
   isAvailable: boolean;
}

export interface IMenuService{
   browseMenus(category?: string): Promise<IMenuItem[]>
   getMenuDetail(menuId: Types.ObjectId): Promise<IMenuItem>
   createMenu(): Promise<void>
   updateMenu(menuId: Types.ObjectId, menuObject: Partial<IMenuItem>): Promise<IMenuItem>
   deleteMenu(menuId: Types.ObjectId): Promise<void>
}