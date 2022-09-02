import express from 'express'
import { SocialLink } from 'models'
import { addLinkSchema } from 'schemas'

const addNewLink = async(req: express.Request, res: express.Response) => {
    const { body } = req

    const validator = await addLinkSchema(body)

    const { value: data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, link } = data

    const last = await SocialLink.find().sort({ _id: -1 }).limit(1)
    await SocialLink.create({
        name,
        link,
        id: last.length ? last[0].id + 1 : 1
    })

    return res.status(200).json({ message: 'Add new social link successfully' })
}

export default { addNewLink }