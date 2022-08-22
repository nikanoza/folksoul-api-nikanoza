import { login } from '../controllers/auth-controller.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/login', login)

export { userRouter }