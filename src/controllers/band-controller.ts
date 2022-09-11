import express from 'express'
import { Band } from 'models'
import { addBandSchema, getBandSchema, updateBandSchema } from 'schemas'

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

const editBandLogo = async (req: express.Request, res: express.Response) => {
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

const editBandDescription = async (req: express.Request, res: express.Response) => {
    const {body} = req
    const validator = await updateBandSchema(body)
    const { value: data, error } = validator.validate(body)

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

const getBand = async (req: express.Request, res: express.Response) => {
    const paramName = req.params.name

    const validator = await getBandSchema({ name: paramName })

    const { value: data, error } = validator.validate({ name: paramName })

    if(error){
        return res.status(422).json(error.details)
    }

    const { name } = data

    const band = await Band.findOne({ name})

    return res.status(200).json(band)

}

export default { createBand, editBandLogo, getBand, editBandDescription }