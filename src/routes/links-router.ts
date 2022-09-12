import multer, { FileFilterCallback } from 'multer'

import express from 'express'
import { DestinationCallback, FileNameCallback } from 'types'
import { LinksController } from 'controllers'
import { authMiddleware } from 'middlewares'

const linksRouter = express.Router()
const { 
    addNewLink, 
    getSocialLink, 
    updateSocialLink, 
    deleteSocialLink, 
    getAllSocialLinks, 
    addLinkLogo,
    updateLinkLogo 
} = LinksController

const fileStorage = multer.diskStorage({
    destination: (
        _: express.Request,
        __: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, 'src/storage')
    },
    filename: (
        _: express.Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (
    _: express.Request,
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

linksRouter.get('/links', getAllSocialLinks)
linksRouter.post('/links/new', authMiddleware, addNewLink)
linksRouter.get('/links/:id', getSocialLink)
linksRouter.put('/links/edit/:id', authMiddleware, updateSocialLink)
linksRouter.delete('/links/delete/:id', authMiddleware, deleteSocialLink)
linksRouter.post('/links-logos/:id',authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), addLinkLogo)
linksRouter.put('/links-logos/edit/:id',authMiddleware, multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), updateLinkLogo)

export default linksRouter