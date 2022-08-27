import { authController } from '../controllers/index.js'
import express from 'express'

const userRouter = express.Router()
const { login } = authController

userRouter.post('/login', login)

export default userRouter 