"use strict";
/**
 * Controller for user-related operations (registration, login, profile, etc.).
 * Handles HTTP requests and responses for user endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPayment = exports.makePayment = exports.placeOrder = exports.getMenuDetails = exports.browseMenus = exports.login = exports.register = void 0;
const tsyringe_1 = require("tsyringe");
// Resolve the service from the DI container
const CustomerService = tsyringe_1.container.resolve("ICustomerService");
const register = async (req, res) => {
    /**
     * Registers a new user.
     * @param req Express request object
     * @param res Express response object
     * @param next Express next middleware function
     */
    const newCustomer = req.body;
    const user = await CustomerService.register(newCustomer);
    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
};
exports.register = register;
const login = async (req, res) => {
    /**
     * Logs in a user.
     * @param req Express request object
     * @param res Express response object
     * @param next Express next middleware function
     */
    const { email, password } = req.body;
    const user = await CustomerService.login({ email, password });
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
};
exports.login = login;
const browseMenus = async (req, res) => {
    /**
     * Fetches the current user's profile.
     * @param req Express request object
     * @param res Express response object
     * @param next Express next middleware function
     */
    const category = req.query.category;
    console.log(`category:${category}`);
    const menus = await CustomerService.browseMenus(category);
    res.status(200).json({
        status: "success",
        data: {
            menus,
        },
    });
};
exports.browseMenus = browseMenus;
const getMenuDetails = async (req, res) => {
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
exports.getMenuDetails = getMenuDetails;
const placeOrder = async (req, res) => {
    const newOrder = req.body;
    const order = await CustomerService.placeOrder(newOrder);
    res.status(201).json({
        status: "success",
        data: {
            order,
        },
    });
};
exports.placeOrder = placeOrder;
const makePayment = async (req, res) => {
    const paymentData = req.body;
    const payment_url = await CustomerService.makePayment(paymentData);
    res.status(200).json({
        status: "success",
        data: {
            payment_url,
        },
    });
};
exports.makePayment = makePayment;
const confirmPayment = async (req, res) => {
    const reference = req.query.reference;
    const message = await CustomerService.confirmPayment(reference);
    res.status(200).json({
        status: "success",
        data: {
            message,
        },
    });
};
exports.confirmPayment = confirmPayment;
