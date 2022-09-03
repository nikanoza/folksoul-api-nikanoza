import express from 'express'
import { LinksController } from 'controllers'

const linksRouter = express.Router()
const { addNewLink, getSocialLink, updateSocialLink } = LinksController

linksRouter.post('/links/new', addNewLink)
linksRouter.get('/links/:id', getSocialLink)
linksRouter.put('/links/edit/:id', updateSocialLink)

export default linksRouter