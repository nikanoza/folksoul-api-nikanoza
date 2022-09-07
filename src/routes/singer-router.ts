import multer, { FileFilterCallback } from 'multer'

import express from 'express'
import { DestinationCallback, FileNameCallback } from 'types'
import { singerController } from 'controllers'
import { authMiddleware } from 'middlewares'

const singerRouter = express.Router()
const { 
    addNewSinger, 
    getAllSinger, 
    getSinger, 
    deleteSinger, 
    updateSinger,
    addAvatar,
    updateAvatar
} = singerController

const fileStorage = multer.diskStorage({
    destination: (
        request: express.Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, 'src/storage')
    },
    filename: (
        req: express.Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (
    request: express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

singerRouter.post('/singer/new', authMiddleware, addNewSinger)
singerRouter.get('/singers', getAllSinger)
singerRouter.get('/singers/:id', getSinger)
singerRouter.delete('/singers/delete/:id', authMiddleware,  deleteSinger);
singerRouter.put('/singers/edit/:id', authMiddleware, updateSinger);
singerRouter.post('/singers-logos/:id', authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), addAvatar)
singerRouter.put('/singers-logos/edit/:id', authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), updateAvatar)

export default singerRouter 