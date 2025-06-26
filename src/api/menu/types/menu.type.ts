import { Document, Types } from "mongoose";

export interface IMenuItem extends Document {
   id: Types.ObjectId;
   name: string;
   description: string;
   price: number;
   category: string;
   imageUrl: string;
   isAvailable: boolean;
}
// Menu DTO type
export type TMenuItem = Pick<
   IMenuItem,
   "id" | "name" | "description" | "price" | "category" | "imageUrl" | "isAvailable"
   >;

// Menu Input types
export type TCreateMenuInput = Required<IMenuItem>
export type TUpdateMenuItem = Partial<IMenuItem>

export interface IMenuService {
   browseMenus(category?: string): Promise<IMenuItem[]>;
   getMenuDetail(menuId: Types.ObjectId): Promise<IMenuItem>;
   createMenu(menu:TCreateMenuInput): Promise<void>;
   updateMenu(menuId: Types.ObjectId, menuObject: TUpdateMenuItem): Promise<IMenuItem>;
   deleteMenu(menuId: Types.ObjectId): Promise<void>;
}
