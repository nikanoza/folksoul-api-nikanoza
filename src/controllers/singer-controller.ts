import express from 'express'
import { Singer } from '../models/Singer.js'

import { addNewSingerSchema } from 'schemas'

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

export { addNewSinger }