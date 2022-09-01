import { bandController } from 'controllers'
import multer from 'multer'

import express from 'express'

const bandRouter = express.Router()
const { createBand } = bandController

bandRouter.post('/band', multer().single('logo'), createBand)

export default bandRouter 
