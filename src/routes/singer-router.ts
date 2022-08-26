import express from 'express'
import { addNewSinger } from '../controllers/singer-controller.js'

const singerRouter = express.Router()

singerRouter.post('/new', addNewSinger)

export { singerRouter }