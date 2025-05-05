import express from 'express'
import upload from '../configs/multer.config.js'

import { isAdmin, isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { getAllProductsController, getProductByIDController } from '../controllers/product.controller.js'
import { getProductsByCategoryController } from '../controllers/category.controller.js'


const productRouter = express.Router()

// only admin

productRouter.get('/all', getAllProductsController)
productRouter.get('/:productId', getProductByIDController)
// Get all products under a specific category
productRouter.get('/category/:categoryId', getProductsByCategoryController);


export default productRouter