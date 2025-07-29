import { Router } from "express";
import * as AdminController from '../api/user/controllers/admin.controller'

const router = Router()



// Auth endpoints
router.post('/login', AdminController.login)

// all Menu endpoits
router.post('/create-menu', AdminController.createMenu)
router.put('/update-menu/:menuId', AdminController.updateMenu)
router.delete('/delete-menu/:menuId', AdminController.deleteMenu)


// all CUSTOMER enpoints
router.get('/fetch-all-customer', AdminController.getAllCustomers)

// all PAYMENT endpoint
router.get('/confirm/payment', AdminController.confirmPayment)
router.get("/fetch-a-payment/:paymentId", AdminController.fetchAPayment);
router.get("/fetch-all-payment", AdminController.fetchAllPayment);

// all ORDER enpoints
router.put('/update-order/:orderId', AdminController.updateOrder)
router.get('/fetch-all-order', AdminController.fetchAllOrder)



export default router