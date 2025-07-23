"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Utils/Error/CustomError");
const util_1 = __importDefault(require("util"));
const globalErrorHandler = async (err, _req, res, _next) => {
    let message = err.message;
    const status = err.status ?? 'fail';
    const statusCode = err.statusCode ?? 500;
    const type = err.type ?? 'SERVER_ERR';
    let errorDetail = {};
    if (err instanceof CustomError_1.ValidationError) {
        errorDetail = { error: err.error };
    }
    if (!err.isOperational) {
        console.error("Server Error:", util_1.default.inspect(err, { depth: null, colors: true }));
        message = `Error coming from server:${err.message}`;
    }
    res.status(statusCode).json({
        status,
        message,
        type,
        ...errorDetail
    });
};
exports.default = globalErrorHandler;
