"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, statusCode, type, status, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
        this.status = status;
        this.isOperational = isOperational;
        this.status = 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseError;
