import { Router } from "express";
import * as UserController from '.././api/user/controllers/user.controller'

const router = Router()

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/menus", UserController.browseMenus);
router.post("/menus/:menuId", UserController.getMenuDetails);
router.post("/orders", UserController.placeOrder);
router.post("/payments", UserController.makePayment);

export default router