import { bandController } from 'controllers'
import multer, { FileFilterCallback } from 'multer'

import express from 'express'
import { DestinationCallback, FileNameCallback } from 'types'

const bandRouter = express.Router()
const { createBand } = bandController

const fileStorage = multer.diskStorage({
    destination: (
        request: express.Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, '/storage/band')
    },

    filename: (
        req: express.Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, file.filename)
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

bandRouter.post('/band', multer({storage: fileStorage, fileFilter: fileFilter}).single('logo'), createBand)

export default bandRouter 
