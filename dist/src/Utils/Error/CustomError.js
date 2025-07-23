"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.BadRequestError = exports.NotFoundError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class NotFoundError extends BaseError_1.default {
    constructor(message = 'Resource not found') {
        super(message, 404, 'NOTFOUND_ERR');
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends BaseError_1.default {
    constructor(message, type) {
        super(message, 400, type);
        this.message = message;
        this.type = type;
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends BaseError_1.default {
    constructor(error) {
        super('Invalid request body', 400, 'VALIDATION_ERR');
        this.error = error;
    }
}
exports.ValidationError = ValidationError;
