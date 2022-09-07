import express from 'express'
import { Avatar, Singer } from 'models'

import { addNewSingerSchema, getSingerSchema, singerUpdateSchema, addAvatarSchema, updateAvatarSchema } from '../schemas/index.js'

const addNewSinger = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = addNewSingerSchema()
    
    const {value: data, error} = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const {name, instrument, orbitLength, color, biography} = data

    const last = await Singer.find().sort({ _id: -1 }).limit(1)

    await Singer.create({
        name,
        instrument,
        orbitLength,
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

    return res.status(200).json(singer)
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
    await Avatar.findOneAndRemove({ singerId: id })

    return res.status(200).send({ message: 'member removed successfully' })
}

const updateSinger = async(req: express.Request, res: express.Response) => {
    const { body } = req
    const paramId = +req.params.id
    const validator = await singerUpdateSchema({...body, id: paramId})
    const { value: data, error } = validator.validate({...body, id: paramId})

    if (error) {
        return res.status(422).json(error.details)
    }

    const {name, instrument, orbitLength, color, biography, id } = data

    await Singer.findOneAndUpdate(
        { id },
        { 
            name,
            instrument,
            orbitLength,
            color,
            biography,
        }
    )

    return res.status(200).send({ message: 'singer info updated successfully' })
}

const addAvatar = async (req: express.Request, res: express.Response) => {
    const {file} = req
    const paramId = +req.params.id
    const validator = await addAvatarSchema({
        singerId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })
    const { value: data, error } = validator.validate({
        singerId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const { image, singerId } = data

    await Avatar.create({
        image,
        singerId
    })

    return res.status(200).json({ message: 'Avatar add successfully' })
}

const updateAvatar = async (req: express.Request, res: express.Response) => {
    const {file} = req
    const paramId = +req.params.id

    const validator = await updateAvatarSchema({
        singerId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    const { value: data, error } = validator.validate({
        singerId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const { image, singerId } = data

    await Avatar.findOneAndUpdate({ singerId }, { image })

    return res.status(200).json({ message: 'Avatar updated successfully' })
}

export default { addNewSinger, getAllSinger, getSinger, deleteSinger, updateSinger, addAvatar, updateAvatar }