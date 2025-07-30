import { Router } from "express";
import { upload } from "../shared/multer.config";
import { handleImageUpload } from "../uploads/upload.controller";

const router = Router();

router.post("/image", upload.single('image'), handleImageUpload);

export default router