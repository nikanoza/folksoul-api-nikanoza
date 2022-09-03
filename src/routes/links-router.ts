import express from 'express'
import { LinksController } from 'controllers'

const linksRouter = express.Router()
const { addNewLink, getSocialLink } = LinksController

linksRouter.post('/links/new', addNewLink)
linksRouter.get('/links/:id', getSocialLink)

export default linksRouter