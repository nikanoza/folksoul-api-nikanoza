import express from 'express'

const createBand = async (req: express.Request, res: express.Response) => {
    console.log(req)
    return res.status(201).statusMessage
}

export default { createBand }