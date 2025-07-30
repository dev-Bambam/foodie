/**
 * Controller for admin-related operations (e.g., user management, admin authentication).
 * Handles HTTP requests and responses for admin endpoints.
 */

import { container } from "tsyringe";
import { Request, Response } from "express";
import { IAdminService } from "../types/user.types";
import { REPLCommand } from "repl";

const AdminService = container.resolve<IAdminService>("IAdminService");

// AUTHENTICATION
export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const user = await AdminService.login({ email, password });
   res.status(200).json({
      status: "success",
      data: {
         user,
      },
   });
};


// CRUD on MENU
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
   res.status(204).json({
      status: 'success',
      data: {
         message:"menu deleted successfully"
      }
   });
};

export const browseMenus = async (req: Request, res: Response) => {
   const category = req.query.category as string
   const menus = await AdminService.browseMenus(category)

   res.status(200).json({
      status: 'success',
      data: {
         menus
      }
   })
}

export const getMenuDetails = async (req: Request, res: Response) => {
   const { menuId } = req.params
   const menu = await AdminService.getMenuDetail(menuId)

   res.status(200).json({
      status: 'success',
      data: {
         menu
      }
   })
}


// CRUD on ORDER
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


// CRUD on USER
export const getAllCustomers = async (req: Request, res: Response) => {
   const customers = await AdminService.getAllCustomers();
   res.status(200).json({
      status: "success",
      data: { customers },
   });
};

// CRUD on PAYMENT
export const confirmPayment = async (req: Request, res: Response) => {
   const { paymentId } = req.params;
   const payment = await AdminService.confirmPayment(paymentId);
   res.status(200).json({
      status: "success",
      data: {
         payment,
      },
   });
};

export const fetchAPayment = async (req: Request, res: Response) => {
   const { paymentId } = req.params;
   const payment = await AdminService.fetchAPayment(paymentId);
   res.status(200).json({
      status: "success",
      data: {
         payment,
      },
   });
};

export const fetchAllPayment = async (req: Request, res: Response) => {
   const status = req.query.status as "pending" | "successful" | "failed";
   const allPayment = await AdminService.fetchAllPayment(status);
   res.status(200).json({
      status: "success",
      data: {
         allPayment,
      },
   });
};
