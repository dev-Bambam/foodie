"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../shared/multer.config");
const upload_controller_1 = require("../uploads/upload.controller");
const router = (0, express_1.Router)();
router.post("/image", multer_config_1.upload.single('image'), upload_controller_1.handleImageUpload);
exports.default = router;
