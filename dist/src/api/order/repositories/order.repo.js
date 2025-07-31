"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const tsyringe_1 = require("tsyringe");
const order_model_1 = __importDefault(require("./../../../Models/order.model"));
let OrderRepo = class OrderRepo {
    async createOrder(orderInput) {
        const newOrder = await order_model_1.default.create(orderInput);
        // return {
        //    id: newOrder.id,
        //    userId: newOrder.userId,
        //    items: newOrder.items,
        //    totalPrice: newOrder.totalPrice,
        //    deliveryAddress: newOrder.deliveryAddress,
        //    status: newOrder.status as "pending",
        //    createdAt: newOrder.createdAt
        // };
        return newOrder;
    }
    async fetchAllOrder(status) {
        if (status) {
            return await order_model_1.default.find({ status });
        }
        return await order_model_1.default.find().sort({ createdAt: -1 });
    }
    async updateOrder(orderId, orderObject) {
        const updatedOrder = await order_model_1.default.findByIdAndUpdate(orderId, orderObject, { new: true });
        return updatedOrder;
    }
    async deleteOrder(orderId) {
        await order_model_1.default.findByIdAndDelete(orderId);
    }
};
exports.OrderRepo = OrderRepo;
exports.OrderRepo = OrderRepo = __decorate([
    (0, tsyringe_1.injectable)()
], OrderRepo);
