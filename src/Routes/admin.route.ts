import { Router } from "express";
import * as AdminController from '../api/user/controllers/admin.controller'

const router = Router()


// all POST endpointe
router.post('/create-menu', AdminController.createMenu)
router.post('/login', AdminController.login)


// all GET enpoints
router.get('/fetch-all-order', AdminController.fetchAllOrder)
router.get('/fetch-all-customer', AdminController.getAllCustomers)
router.get('/confirm/payment', AdminController.confirmPayment)
router.get("/fetch-a-payment/:paymentId", AdminController.fetchAPayment);
router.get("/fetch-all-payment", AdminController.fetchAllPayment);

// all PUT enpoints
router.put('/update-order/:orderId', AdminController.updateOrder)
router.put('/update-menu/:menuId', AdminController.updateMenu)

// all DELETE endpoints
router.delete('/delete-menu', AdminController.deleteMenu)

export default router