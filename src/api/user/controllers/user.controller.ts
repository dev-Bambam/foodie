import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICustomerService } from "../types/user.types";

// Resolve the service from the DI container
const customerService = container.resolve<ICustomerService>("ICustomerService");

export const register = async (req: Request, res: Response) => {
   const newCustomer = req.body
   const customer = await customerService.register(newCustomer);
   res.status(201).json({
      status: "success",
      data: {
         customer,
      },
   });
};

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const customer = await customerService.login({ email, password });
   res.status(200).json({
      status: "success",
      data: {
         customer,
      },
   });
};

export const browseMenus = async (req: Request, res: Response) => {
   const category = req.query.category as string;
   const menus = await customerService.browseMenus(category);
   res.status(200).json({
      status: "success",
      data: {
         menus,
      },
   });
};

export const getMenuDetails = async (req: Request, res: Response) => {
   const { menuId } = req.params;
   const menu = await customerService.getMenuDetails(menuId);
   res.status(200).json({
      status: "success",
      data: {
         menu,
      },
   });
};

export const placeOrder = async (req: Request, res: Response) => {
   const newOrder = req.body;
   const order = await customerService.placeOrder(newOrder);
   res.status(201).json({
      status: "success", 
      data: {
         order
      }
   });
};

export const makePayment = async (req: Request, res: Response) => {
   const paymentData = req.body;
   const payment_url = await customerService.makePayment(paymentData);
   res.status(200).json({
      status: "success",
      data: {
         payment_url
      }
   });
};
