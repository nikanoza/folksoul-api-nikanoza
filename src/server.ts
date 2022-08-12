import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import connectToMongo from './config/mongo.js'
import { userRouter } from './routes/user-router.js'
import { swaggerMiddleware } from './middlewares/swagger-middleware.js'

const app = express()
dotenv.config()
connectToMongo()

app.use(bodyParser.json())
app.use('/api', cors(), userRouter)
app.use('/', ...swaggerMiddleware)

const server = http.createServer(app)
server.listen(process.env.SERVER_PORT)