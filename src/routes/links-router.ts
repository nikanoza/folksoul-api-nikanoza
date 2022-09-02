import express from 'express'
import { LinksController } from 'controllers'

const linksRouter = express.Router()
const { addNewLink } = LinksController

linksRouter.post('/links/new', addNewLink)

export default linksRouter