import express from 'express'
import upload from '../configs/multer.config.js'
import { getProfileController, loginController, logoutController, signupController } from '../controllers/auth.controller.js'
import { isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { getAllCategoriesController } from '../controllers/category.controller.js'

const userRouter = express.Router()


//auth related
userRouter.post('/signup',upload.single('profilePic'), signupController)
userRouter.post('/login',loginController)
userRouter.get('/profile', isAuthenticatedUser, getProfileController)
userRouter.delete('/logout',isAuthenticatedUser, logoutController)



export default userRouter