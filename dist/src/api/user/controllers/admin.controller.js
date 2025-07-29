"use strict";
/**
 * Controller for admin-related operations (e.g., user management, admin authentication).
 * Handles HTTP requests and responses for admin endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllPayment = exports.fetchAPayment = exports.confirmPayment = exports.login = exports.getAllCustomers = exports.updateOrder = exports.fetchAllOrder = exports.deleteMenu = exports.updateMenu = exports.createMenu = void 0;
const tsyringe_1 = require("tsyringe");
const AdminService = tsyringe_1.container.resolve("IAdminService");
/**
 * Registers a new admin user.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const createMenu = async (req, res) => {
    const menuInput = req.body;
    const menu = await AdminService.createMenu(menuInput);
    res.status(200).json({
        status: "success",
        data: {
            menu,
        },
    });
};
exports.createMenu = createMenu;
/**
 * Updates an existing menu.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const updateMenu = async (req, res) => {
    const { menuId } = req.params;
    const menuInput = req.body;
    const menu = await AdminService.updateMenu(menuId, menuInput);
    res.status(200).json({
        status: "success",
        data: { menu },
    });
};
exports.updateMenu = updateMenu;
/**
 * Deletes a menu by ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const deleteMenu = async (req, res) => {
    const { menuId } = req.params;
    await AdminService.deleteMenu(menuId);
    res.status(204).send();
};
exports.deleteMenu = deleteMenu;
/**
 * Fetches all orders for admin review.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const fetchAllOrder = async (req, res) => {
    const { status } = req.query;
    const orders = await AdminService.fetchAllOrder(status);
    res.status(200).json({
        status: "success",
        data: { orders },
    });
};
exports.fetchAllOrder = fetchAllOrder;
/**
 * Updates the status or details of an order.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const orderData = req.body;
    const order = await AdminService.updateOrder(orderId, orderData);
    res.status(200).json({
        status: "success",
        data: { order },
    });
};
exports.updateOrder = updateOrder;
/**
 * Fetches all customers for admin review.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const getAllCustomers = async (req, res) => {
    const customers = await AdminService.getAllCustomers();
    res.status(200).json({
        status: "success",
        data: { customers },
    });
};
exports.getAllCustomers = getAllCustomers;
/**
 * Logs in an admin user.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminService.login({ email, password });
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
};
exports.login = login;
/**
 * Confirms a payment by its ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const confirmPayment = async (req, res) => {
    const { paymentId } = req.params;
    const payment = await AdminService.confirmPayment(paymentId);
    res.status(200).json({
        status: "success",
        data: {
            payment,
        },
    });
};
exports.confirmPayment = confirmPayment;
/**
 * Fetches a specific payment by its ID.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const fetchAPayment = async (req, res) => {
    const { paymentId } = req.params;
    const payment = await AdminService.fetchAPayment(paymentId);
    res.status(200).json({
        status: "success",
        data: {
            payment,
        },
    });
};
exports.fetchAPayment = fetchAPayment;
/**
 * Fetches all payments with optional status filtering.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
const fetchAllPayment = async (req, res) => {
    const status = req.query.status;
    const allPayment = await AdminService.fetchAllPayment(status);
    res.status(200).json({
        status: "success",
        data: {
            allPayment,
        },
    });
};
exports.fetchAllPayment = fetchAllPayment;
