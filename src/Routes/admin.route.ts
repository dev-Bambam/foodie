import { Router } from "express";
import * as AdminController from '../api/user/controllers/admin.controller'

const router = Router()

router.post('/create-menu', AdminController.createMenu)

export default router