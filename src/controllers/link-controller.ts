import express from 'express'
import { SocialLink, Logo } from 'models'
import { addLinkLogoSchema, addLinkSchema, getLinkSchema, updateLinkLogoSchema, updateLinkSchema } from 'schemas'

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

const getSocialLink = async(req: express.Request, res: express.Response) => {
    const paramId = +req.params.id

    const validator = await getLinkSchema({id: paramId})
    const { value: data, error } = validator.validate({ id: paramId})

    if(error){
        return res.status(422).json(error.details)
    }

    const { id } = data
    const link = await SocialLink.findOne({ id })

    return res.json(link)

}

const updateSocialLink = async(req: express.Request, res: express.Response) => {
    const paramId = +req.params.id

    const { body } = req
    const validator = await updateLinkSchema({...body, id: paramId})
    const { value: data, error } = validator.validate({...body, id: paramId})

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, link, id } = data

    await SocialLink.findOneAndUpdate({ id },{ name, link })

    return res.status(200).json({ message: 'social link update successfully' })
}

const deleteSocialLink = async(req: express.Request, res: express.Response) => {
    const paramId = +req.params.id

    const validator = await getLinkSchema({id: paramId})
    const {value: data, error} = validator.validate({id: paramId})

    if(error){
        return res.status(422).json(error.details)
    }

    const { id } = data
    await SocialLink.findOneAndRemove({ id })

    return res.status(200).send({ message: 'social link removed successfully' })
}

const getAllSocialLinks = async(_: express.Request, res: express.Response) => {
    const data = await SocialLink.find()

    return res.status(200).json(data)
}

const addLinkLogo = async (req: express.Request, res: express.Response) => {
    const {file} = req
    const paramId = +req.params.id
    const validator = await addLinkLogoSchema({
        socialLinkId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })
    const { value: data, error } = validator.validate({
        socialLinkId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const { image, socialLinkId } = data

    await Logo.create({
        image,
        socialLinkId
    })

    return res.status(200).json({ message: 'Add social link logo successfully' })
}

const updateLinkLogo = async (req: express.Request, res: express.Response) => {
    const {file} = req
    const paramId = +req.params.id
    const validator = await updateLinkLogoSchema({
        socialLinkId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    const { value:data, error } = validator.validate({
        socialLinkId: paramId, 
        image: file ? '/storage/' + file.filename : '' 
    })

    if(error){
        return res.status(422).json(error.details)
    }

    const { image, socialLinkId } = data

    await Logo.findOneAndUpdate({ socialLinkId}, { image })

    return res.status(200).json({ message: 'update social link logo successfully' })
}

export default { addNewLink, getSocialLink, updateSocialLink, deleteSocialLink, getAllSocialLinks, addLinkLogo, updateLinkLogo }