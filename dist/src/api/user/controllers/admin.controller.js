"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPayment = exports.login = exports.getAllCustomers = exports.updateOrder = exports.fetchAllOrder = exports.deleteMenu = exports.updateMenu = exports.createMenu = void 0;
const tsyringe_1 = require("tsyringe");
const AdminService = tsyringe_1.container.resolve("IAdminService");
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
    res.status(204).send();
};
exports.deleteMenu = deleteMenu;
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
const getAllCustomers = async (req, res) => {
    const customers = await AdminService.getAllCustomers();
    res.status(200).json({
        status: "success",
        data: { customers },
    });
};
exports.getAllCustomers = getAllCustomers;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminService.login({ email, password });
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
};
exports.login = login;
const confirmPayment = async (req, res) => {
    const { paymentId } = req.params;
    const payment = await AdminService.confirmPayment(paymentId);
    res.status(200).json({
        status: 'success',
        data: {
            payment
        }
    });
};
exports.confirmPayment = confirmPayment;
