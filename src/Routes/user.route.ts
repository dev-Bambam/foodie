import { Router } from "express";
import * as UserController from '.././api/user/controllers/user.controller'

const router = Router()

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/menus", UserController.browseMenus);
router.get("/menus/:menuId", UserController.getMenuDetails);
router.post("/orders", UserController.placeOrder);
router.post("/payments", UserController.makePayment);
router.get('/confirm-payment', UserController.confirmPayment)

export default router