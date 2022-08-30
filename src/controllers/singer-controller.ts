import express from 'express'
import { Singer } from '../models/index.js'

import { addNewSingerSchema, getSingerSchema, singerUpdateSchema } from '../schemas/index.js'

const addNewSinger = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = addNewSingerSchema()
    
    const {value: data, error} = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const {name, instrument, orbit_length, color, biography} = data

    const last = await Singer.find().sort({ _id: -1 }).limit(1)

    await Singer.create({
        name,
        instrument,
        orbit_length,
        color,
        biography,
        id: last.length ? last[0].id + 1 : 1,
    })

    return res.status(200).json({ message: 'Add new member successfully' })
}

const getAllSinger = async (_: express.Request, res: express.Response) => {
    const data = await Singer.find();
    return res.json(data);
}

const getSinger = async(req: express.Request, res: express.Response) => {
    const paramId = +req.params.id
    const validator = await getSingerSchema({id: paramId})
    const { value: data, error } = validator.validate({id: paramId})

    if (error) {
        return res.status(422).json(error.details)
    }

    const { id } = data
    const singer = await Singer.findOne({ id })

    return res.json(singer)
}

const deleteSinger = async(req: express.Request, res: express.Response) => {
    const paramId = +req.params.id
    const validator = await getSingerSchema({id: paramId})
    const { value: data, error } = validator.validate({id: paramId})

    if (error) {
        return res.status(422).json(error.details)
    }

    const { id } = data
    await Singer.findOneAndRemove({ id })

    return res.status(200).send()
}

const updateSinger = async(req: express.Request, res: express.Response) => {
    const { body } = req
    const paramId = +req.params.id
    const validator = await singerUpdateSchema({...body, id: paramId})
    const { value: data, error } = validator.validate({...body, id: paramId})

    if (error) {
        return res.status(422).json(error.details)
    }

    const {name, instrument, orbit_length, color, biography, id } = data

    await Singer.findOneAndUpdate(
        { id },
        { 
            name,
            instrument,
            orbit_length,
            color,
            biography,
        }
    )

    return res.status(200).send()
}
export default { addNewSinger, getAllSinger, getSinger, deleteSinger, updateSinger }