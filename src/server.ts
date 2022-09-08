import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import connectToMongo from './config/mongo.js'
import { userRouter, bandRouter, singerRouter, linksRouter } from 'routes'
import { swaggerMiddleware } from 'middlewares'
import path from 'path'

const app = express()
dotenv.config()
connectToMongo()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/storage', express.static(path.join(__dirname, 'storage')))

app.use('/api', cors(), userRouter)
app.use('/api', cors(), bandRouter)
app.use('/api', cors(), singerRouter)
app.use('/api', cors(), linksRouter)
app.use('/', ...swaggerMiddleware)

const server = http.createServer(app)
server.listen(process.env.SERVER_PORT)