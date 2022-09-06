import express from 'express'
import { addBandSchema } from 'schemas'

const createBand = async (req: express.Request, res: express.Response) => {
    const {body, file} = req

    const validator = await addBandSchema({...body, logo: file ? file.path : '' })
    const { value: data, error } = validator.validate({...body, logo: file ? file.path : '' })

    if(error){
        
    }
    return res.status(201).statusMessage
}

export default { createBand }