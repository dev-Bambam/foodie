import { Router } from "express";
import userRoutes from './user.route'
import adminRoutes from './admin.route'
import fileUploadRoutes from './upload.route'

const router = Router()

router.use('/user', userRoutes)
router.use("/admin", adminRoutes);
router.use('/upload', fileUploadRoutes);

export default router;