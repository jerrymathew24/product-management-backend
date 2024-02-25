import express from 'express'
import { createProductController, getProductController } from '../controller/productController.js'

const router = express.Router()

router.post('/create-product', createProductController)
router.get('/get-product', getProductController)




export default router