"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const CustomError_1 = require("../Utils/Error/CustomError");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
function validateBody(schema) {
    const validate = ajv.compile(schema);
    return (res, req, next) => {
        const valid = validate(req.body);
        if (!valid) {
            next(new CustomError_1.ValidationError(validate.errors ?? []));
            return;
        }
        next();
    };
}
