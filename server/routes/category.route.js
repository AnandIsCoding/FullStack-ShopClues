import express from 'express'
import upload from '../configs/multer.config.js'

import { isAdmin, isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { createCategoryController, getAllCategoriesController } from '../controllers/category.controller.js'
const categoryRouter = express.Router()


// normal all user get category
categoryRouter.get('/all',getAllCategoriesController)


export default categoryRouter