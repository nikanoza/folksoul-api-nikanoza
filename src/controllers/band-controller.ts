import express from 'express'
import { Band } from 'models'
import { addBandSchema, updateBandSchema } from 'schemas'

const createBand = async (req: express.Request, res: express.Response) => {
    const {body, file} = req
    const validator = await addBandSchema({
        ...body, 
        logo: file ? '/storage/' + file.filename : '' 
    })
    const { value: data, error } = validator.validate({
        ...body, 
        logo: file ? '/storage/' + file.filename : '' 
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const {description, logo, name} = data

    await Band.create({
        description,
        logo,
        name
    })

    return res.status(200).json({ message: 'Add band successfully' })
}

const editBand = async (req: express.Request, res: express.Response) => {
    const {body, file} = req
    const validator = await updateBandSchema({
        ...body, 
        logo: file ? '/storage/' + file.filename : '', 
    })
    const { value: data, error } = validator.validate({
        ...body, 
        logo: file ? '/storage/' + file.filename : '',
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const {description, logo, name} = data

    await Band.findOneAndUpdate({ name },{
        description,
        logo
    })

    return res.status(200).json({ message: 'Band update successfully' })
}

export default { createBand, editBand }