import { createBand } from '../controllers/band-controller.js'
import multer from 'multer'

import express from 'express'

const bandRouter = express.Router()

bandRouter.post('/band', multer().single('logo'), createBand)

export { bandRouter }
