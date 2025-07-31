"use strict";
/**
 * Controller for admin-related operations (e.g., user management, admin authentication).
 * Handles HTTP requests and responses for admin endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllPayment = exports.fetchAPayment = exports.confirmPayment = exports.getAllCustomers = exports.updateOrder = exports.fetchAllOrder = exports.getMenuDetails = exports.browseMenus = exports.deleteMenu = exports.updateMenu = exports.createMenu = exports.login = void 0;
const tsyringe_1 = require("tsyringe");
const AdminService = tsyringe_1.container.resolve("IAdminService");
// AUTHENTICATION
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
// CRUD on MENU
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
const deleteMenu = async (req, res) => {
    const { menuId } = req.params;
    await AdminService.deleteMenu(menuId);
    res.status(200).json({
        status: 'success',
        data: {
            message: "menu deleted successfully"
        }
    });
};
exports.deleteMenu = deleteMenu;
const browseMenus = async (req, res) => {
    const category = req.query.category;
    const menus = await AdminService.browseMenus(category);
    res.status(200).json({
        status: 'success',
        data: {
            menus
        }
    });
};
exports.browseMenus = browseMenus;
const getMenuDetails = async (req, res) => {
    const { menuId } = req.params;
    const menu = await AdminService.getMenuDetail(menuId);
    res.status(200).json({
        status: 'success',
        data: {
            menu
        }
    });
};
exports.getMenuDetails = getMenuDetails;
// CRUD on ORDER
const fetchAllOrder = async (req, res) => {
    const { status } = req.query;
    const orders = await AdminService.fetchAllOrder(status);
    res.status(200).json({
        status: "success",
        data: { orders },
    });
};
exports.fetchAllOrder = fetchAllOrder;
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
// CRUD on USER
const getAllCustomers = async (req, res) => {
    const customers = await AdminService.getAllCustomers();
    res.status(200).json({
        status: "success",
        data: { customers },
    });
};
exports.getAllCustomers = getAllCustomers;
// CRUD on PAYMENT
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
