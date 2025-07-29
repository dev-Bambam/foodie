
export interface IMenuItem {
   id: string;
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
   browseMenus(category?: string): Promise<TMenuItem[] | null >;
   getMenuDetail(menuId: string): Promise<TMenuItem | null >;
   createMenu(menu:TCreateMenuInput): Promise<TMenuItem>;
   updateMenu(menuId: string, menuObject: TUpdateMenuItem): Promise<TMenuItem>;
   deleteMenu(menuId: string): Promise<void>;
}

export interface IMenuRepo {
   findMenuById(menuId: string): Promise<IMenuItem | null>
   getAllMenu(category?: string): Promise<IMenuItem[] | null>
   deleteMenuById(menuId: string): Promise<void>
   updateMenu(menuId: string, menuObject: TUpdateMenuItem): Promise<IMenuItem | null >
   createMenu(menu: TCreateMenuInput): Promise <TMenuItem>
}