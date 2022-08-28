import express from 'express'
import { singerController } from '../controllers/index.js'

const singerRouter = express.Router()
const { addNewSinger, getAllSinger } = singerController

singerRouter.post('/singer/new', addNewSinger)
singerRouter.get('/singers', getAllSinger)

export default singerRouter 