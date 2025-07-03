import { Router } from "express";
import userRoutes from './user.route'
import adminRoutes from './admin.route'

const router = Router()

router.use('/user', userRoutes)
router.use("/admin", adminRoutes);

export default router