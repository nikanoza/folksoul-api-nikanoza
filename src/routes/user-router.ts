import { authController } from 'controllers'
import express from 'express'

const userRouter = express.Router()
const { login } = authController

userRouter.post('/login', login)

export default userRouter 