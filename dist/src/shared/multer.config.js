"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// configure multer for in-memory storage (essential for cloudinary direct upload)
const storage = multer_1.default.memoryStorage();
// configure multer upload middleware 
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5mb
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true); // Accept file
        }
        cb(new Error('Only images (jpeg, jpg, png, gif, webp) are allowed'));
    }
});
