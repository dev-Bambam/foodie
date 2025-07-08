import { container } from "tsyringe";
import { Request, Response } from "express";
import { IAdminService } from "../types/user.types";

const AdminService = container.resolve<IAdminService>("IAdminService");

export const createMenu = async (req: Request, res: Response) => {
   const menuInput = req.body;
   const menu = await AdminService.createMenu(menuInput);

   res.status(200).json({
      status: "success",
      data: {
         menu,
      },
   });
};

export const updateMenu = async (req: Request, res: Response) => {
   const { menuId } = req.params;
   const menuInput = req.body;
   const menu = await AdminService.updateMenu(menuId, menuInput);
   res.status(200).json({
      status: "success",
      data: { menu },
   });
};

export const deleteMenu = async (req: Request, res: Response) => {
   const { menuId } = req.params;
   await AdminService.deleteMenu(menuId);
   res.status(204).send();
};

export const fetchAllOrder = async (req: Request, res: Response) => {
   const { status } = req.query;
   const orders = await AdminService.fetchAllOrder(status as any);
   res.status(200).json({
      status: "success",
      data: { orders },
   });
};

export const updateOrder = async (req: Request, res: Response) => {
   const { orderId } = req.params;
   const orderData = req.body;
   const order = await AdminService.updateOrder(orderId, orderData);
   res.status(200).json({
      status: "success",
      data: { order },
   });
};

export const getAllCustomers = async (req: Request, res: Response) => {
   const customers = await AdminService.getAllCustomers();
   res.status(200).json({
      status: "success",
      data: { customers },
   });
};
