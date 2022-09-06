import express from 'express'
import { LinksController } from 'controllers'

const linksRouter = express.Router()
const { addNewLink, getSocialLink, updateSocialLink, deleteSocialLink, getAllSocialLinks } = LinksController

linksRouter.get('/links', getAllSocialLinks)
linksRouter.post('/links/new', addNewLink)
linksRouter.get('/links/:id', getSocialLink)
linksRouter.put('/links/edit/:id', updateSocialLink)
linksRouter.delete('/links/delete/:id', deleteSocialLink)

export default linksRouter