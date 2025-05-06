import express from 'express'
import {isAuthenticatedUser } from '../middlewares/auth.middleware.js'
import { addRemoveCartController, getUserCartController } from '../controllers/cart.controller.js'

const cartRouter = express.Router()

cartRouter.post('/addorremovecart',isAuthenticatedUser, addRemoveCartController)
cartRouter.get('/all',isAuthenticatedUser, getUserCartController)

export default cartRouter