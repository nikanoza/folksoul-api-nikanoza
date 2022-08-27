import express from 'express'
import { singerController } from '../controllers/index.js'

const singerRouter = express.Router()
const { addNewSinger } = singerController

singerRouter.post('/new', addNewSinger)

export default singerRouter 