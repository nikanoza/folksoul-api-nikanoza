import express from 'express'

export const createBand = async (req: express.Request, res: express.Response) => {
    console.log(req.file)
    return res.status(201).statusMessage
}