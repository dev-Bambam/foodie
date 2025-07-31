"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const router = (0, express_1.Router)();
router.use('/user', user_route_1.default);
router.use("/admin", admin_route_1.default);
router.use('/upload', upload_route_1.default);
exports.default = router;
