/**
 * Controller for user-related operations (registration, login, profile, etc.).
 * Handles HTTP requests and responses for user endpoints.
 */

import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICustomerService } from "../types/user.types";

// Resolve the service from the DI container
const CustomerService = container.resolve<ICustomerService>("ICustomerService");

export const register = async (req: Request, res: Response) => {
   /**
    * Registers a new user.
    * @param req Express request object
    * @param res Express response object
    * @param next Express next middleware function
    */
   const newCustomer = req.body;
   const customer = await CustomerService.register(newCustomer);
   res.status(201).json({
      status: "success",
      data: {
         customer,
      },
   });
};

export const login = async (req: Request, res: Response) => {
   /**
    * Logs in a user.
    * @param req Express request object
    * @param res Express response object
    * @param next Express next middleware function
    */
   const { email, password } = req.body;
   const customer = await CustomerService.login({ email, password });
   res.status(200).json({
      status: "success",
      data: {
         customer,
      },
   });
};

export const browseMenus = async (req: Request, res: Response) => {
   /**
    * Fetches the current user's profile.
    * @param req Express request object
    * @param res Express response object
    * @param next Express next middleware function
    */
   const category = req.query.category as string;
   console.log(`category:${category}`);
   const menus = await CustomerService.browseMenus(category);
   res.status(200).json({
      status: "success",
      data: {
         menus,
      },
   });
};

export const getMenuDetails = async (req: Request, res: Response) => {
   /**
    * Updates the current user's profile.
    * @param req Express request object
    * @param res Express response object
    * @param next Express next middleware function
    */
   const { menuId } = req.params;
   const menu = await CustomerService.getMenuDetails(menuId);
   res.status(200).json({
      status: "success",
      data: {
         menu,
      },
   });
};

export const placeOrder = async (req: Request, res: Response) => {
   const newOrder = req.body;
   const order = await CustomerService.placeOrder(newOrder);
   res.status(201).json({
      status: "success",
      data: {
         order,
      },
   });
};

export const makePayment = async (req: Request, res: Response) => {
   const paymentData = req.body;
   const payment_url = await CustomerService.makePayment(paymentData);
   res.status(200).json({
      status: "success",
      data: {
         payment_url,
      },
   });
};

export const confirmPayment = async (req: Request, res: Response) => {
   const reference = req.query.reference as string;
   const message = await CustomerService.confirmPayment(reference);
   res.status(200).json({
      status: "success",
      data: {
         message,
      },
   });
};
