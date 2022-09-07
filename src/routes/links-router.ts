import multer, { FileFilterCallback } from 'multer'

import express from 'express'
import { DestinationCallback, FileNameCallback } from 'types'
import { LinksController } from 'controllers'

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

linksRouter.get('/links', getAllSocialLinks)
linksRouter.post('/links/new', addNewLink)
linksRouter.get('/links/:id', getSocialLink)
linksRouter.put('/links/edit/:id', updateSocialLink)
linksRouter.delete('/links/delete/:id', deleteSocialLink)
linksRouter.post('/links-logos/:id', multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), addLinkLogo)
linksRouter.put('/links-logos/edit/:id', multer({storage: fileStorage, fileFilter: fileFilter}).single('image'), updateLinkLogo)

export default linksRouter