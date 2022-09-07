import { bandController } from 'controllers'
import multer, { FileFilterCallback } from 'multer'

import express from 'express'
import { DestinationCallback, FileNameCallback } from 'types'
import { authMiddleware } from 'middlewares'

const bandRouter = express.Router()
const { createBand, editBand, getBand } = bandController

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

bandRouter.post('/band', authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('logo'), createBand)
bandRouter.get('/band/:name', getBand)
bandRouter.put('/band/edit', authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('logo'), editBand)

export default bandRouter 
