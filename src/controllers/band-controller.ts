import express from 'express'

// import { IBand } from 'models/Band'
// import { TypedRequestBody } from "types/services.d.js"

export const createBand = async (req: express.Request, res: express.Response) => {
    // const {body } = req
    // const logo = req.file
    // const { description, extra } = body
    console.log(req.file)
    return res.status(201).statusMessage
}