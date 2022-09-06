import Joi from "joi"
import { SocialLink } from "models"
import { ISocialLink } from "types"

const determineIfLinkExists = (link: ISocialLink | null) => (value: string, helpers: any) => {
    if (link) {
      return helpers.message('ბმული აღნიშნული სახელით უკვე არსებობს')
    }
    return value
}

const addLinkSchema = async (data: {name: string, link: string}) => {
    const link = await SocialLink.findOne({name: data.name})
    return Joi.object({
        name: Joi.string()
        .min(2)
        .required()
        .custom(determineIfLinkExists(link))
        .messages({
            'string.base': 'ბმულის სახელი უნდა იყოს ტექსტური',
            'string.min': 'ბმულის სახელი უნდა შედგებოდეს მინიმუმ ორი სიმბოლოსგან',
            'string.custom': 'ბმული აღნიშნული სახელით უკვე არსებობს',
            'string.required': 'ბმულის სახელი არ უნდა იყოს ცარიელი'
        }),
        link: Joi.string()
        .uri()
        .required()
        .messages({
            'string.base': 'ბმულის უნდა იყოს ტექსტური',
            'string.min': 'ბმულის უნდა იყოს ვალიდური',
            'string.required': 'ბმულის ველი არ უნდა იყოს ცარიელი'
        }),
    })
}

export default addLinkSchema