import express from 'express'
import { singerController } from '../controllers/index.js'

const singerRouter = express.Router()
const { addNewSinger, getAllSinger, getSinger, deleteSinger } = singerController

singerRouter.post('/singer/new', addNewSinger)
singerRouter.get('/singers', getAllSinger)
singerRouter.get('/singers/:id', getSinger)
singerRouter.delete('/singers/delete/:id', deleteSinger);

export default singerRouter 