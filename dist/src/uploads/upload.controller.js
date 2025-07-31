"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImageUpload = void 0;
const tsyringe_1 = require("tsyringe");
const UploadService = tsyringe_1.container.resolve('IUploadService');
const handleImageUpload = async (req, res) => {
    const imageFile = req.file;
    if (!imageFile) {
        throw new Error('Image not uploaded');
    }
    const uploadResult = await UploadService.uploadImage(imageFile.buffer);
    res.status(200).json({
        status: 'success',
        data: {
            imageUrl: uploadResult.imageUrl
        }
    });
};
exports.handleImageUpload = handleImageUpload;
