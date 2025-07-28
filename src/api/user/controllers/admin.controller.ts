/**
 * Controller for admin-related operations (e.g., user management, admin authentication).
 * Handles HTTP requests and responses for admin endpoints.
 */

import { container } from "tsyringe";
import { Request, Response } from "express";
import { IAdminService } from "../types/user.types";

const AdminService = container.resolve<IAdminService>("IAdminService");

/**
 * Registers a new admin user.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
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

/**
 * Updates an existing menu.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const updateMenu = async (req: Request, res: Response) => {
   const { menuId } = req.params;
   const menuInput = req.body;
   const menu = await AdminService.updateMenu(menuId, menuInput);
   res.status(200).json({
      status: "success",
      data: { menu },
   });
};

/**
 * Deletes a menu by ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const deleteMenu = async (req: Request, res: Response) => {
   const { menuId } = req.params;
   await AdminService.deleteMenu(menuId);
   res.status(204).send();
};

/**
 * Fetches all orders for admin review.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const fetchAllOrder = async (req: Request, res: Response) => {
   const { status } = req.query;
   const orders = await AdminService.fetchAllOrder(status as any);
   res.status(200).json({
      status: "success",
      data: { orders },
   });
};

/**
 * Updates the status or details of an order.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const updateOrder = async (req: Request, res: Response) => {
   const { orderId } = req.params;
   const orderData = req.body;
   const order = await AdminService.updateOrder(orderId, orderData);
   res.status(200).json({
      status: "success",
      data: { order },
   });
};

/**
 * Fetches all customers for admin review.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const getAllCustomers = async (req: Request, res: Response) => {
   const customers = await AdminService.getAllCustomers();
   res.status(200).json({
      status: "success",
      data: { customers },
   });
};

/**
 * Logs in an admin user.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
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

/**
 * Confirms a payment by its ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
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

/**
 * Fetches a specific payment by its ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
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

/**
 * Fetches all payments with optional status filtering.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
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
