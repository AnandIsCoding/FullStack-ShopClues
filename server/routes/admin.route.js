import express from 'express'
import upload from '../configs/multer.config.js'

import { isAdmin, isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { createCategoryController, deleteCategoryController, getAllCategoriesController } from '../controllers/category.controller.js'

const adminRouter = express.Router()

// only admin
adminRouter.post('/create-category',isAuthenticatedUser, isAdmin, upload.single('thumbnail'), createCategoryController)
adminRouter.delete('/delete-category/:categoryId', isAuthenticatedUser, isAdmin, deleteCategoryController)

export default adminRouter