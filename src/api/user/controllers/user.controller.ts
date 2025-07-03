import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICustomerService } from "../types/user.types";

// Resolve the service from the DI container
const customerService = container.resolve<ICustomerService>("ICustomerService");

export const register = async (req: Request, res: Response) => {
   try {
      const customer = await customerService.register(req.body);
      res.status(201).json({ status: "success", customer });
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};

export const login = async (req: Request, res: Response) => {
   try {
      const result = await customerService.login(req.body);
      res.status(200).json({ status: "success", ...result });
   } catch (error:any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};

export const browseMenus = async (req: Request, res: Response) => {
   try {
      const menus = await customerService.browseMenus(req.query.category as string);
      res.status(200).json({ status: "success", menus });
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};

export const getMenuDetails = async (req: Request, res: Response) => {
   try {
      const menu = await customerService.getMenuDetails(req.params.menuId);
      res.status(200).json({ status: "success", menu });
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};

export const placeOrder = async (req: Request, res: Response) => {
   try {
      const order = await customerService.placeOrder(req.body);
      res.status(201).json({ status: "success", order });
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};

export const makePayment = async (req: Request, res: Response) => {
   try {
      const { userId, orderId, amount } = req.body;
      const payment = await customerService.makePayment(userId, orderId, amount);
      res.status(200).json({ status: "success", payment });
   } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: "fail", message: error.message });
   }
};
