import express from 'express'
import { singerController } from 'controllers'

const singerRouter = express.Router()
const { addNewSinger, getAllSinger, getSinger, deleteSinger, updateSinger } = singerController

singerRouter.post('/singer/new', addNewSinger)
singerRouter.get('/singers', getAllSinger)
singerRouter.get('/singers/:id', getSinger)
singerRouter.delete('/singers/delete/:id', deleteSinger);
singerRouter.put('/singers/edit/:id', updateSinger);

export default singerRouter 