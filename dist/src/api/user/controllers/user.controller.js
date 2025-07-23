"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = exports.placeOrder = exports.getMenuDetails = exports.browseMenus = exports.login = exports.register = void 0;
const tsyringe_1 = require("tsyringe");
// Resolve the service from the DI container
const customerService = tsyringe_1.container.resolve("ICustomerService");
const register = async (req, res) => {
    const newCustomer = req.body;
    const customer = await customerService.register(newCustomer);
    res.status(201).json({
        status: "success",
        data: {
            customer,
        },
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const customer = await customerService.login({ email, password });
    res.status(200).json({
        status: "success",
        data: {
            customer,
        },
    });
};
exports.login = login;
const browseMenus = async (req, res) => {
    const category = req.query.category;
    console.log(`category:${category}`);
    const menus = await customerService.browseMenus(category);
    res.status(200).json({
        status: "success",
        data: {
            menus,
        },
    });
};
exports.browseMenus = browseMenus;
const getMenuDetails = async (req, res) => {
    const { menuId } = req.params;
    const menu = await customerService.getMenuDetails(menuId);
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
    const order = await customerService.placeOrder(newOrder);
    res.status(201).json({
        status: "success",
        data: {
            order
        }
    });
};
exports.placeOrder = placeOrder;
const makePayment = async (req, res) => {
    const paymentData = req.body;
    const payment_url = await customerService.makePayment(paymentData);
    res.status(200).json({
        status: "success",
        data: {
            payment_url
        }
    });
};
exports.makePayment = makePayment;
