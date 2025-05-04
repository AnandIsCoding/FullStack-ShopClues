import express from 'express'
import upload from '../configs/multer.config.js'

import { isAdmin, isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { getAllProductsController, getProductByIDController } from '../controllers/product.controller.js'


const productRouter = express.Router()

// only admin

productRouter.get('/all', getAllProductsController)
productRouter.get('/:productId', getProductByIDController)

export default productRouter