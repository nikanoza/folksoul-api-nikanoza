import Joi from 'joi'
import { SocialLink } from 'models'
import { ISocialLink } from 'types'

const determineIfLinkExists = (link: ISocialLink | null) => (value: number, helpers: any) => {
    if (!link) {
      return helpers.message('სოციალური ბმული აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
}

const updateLinkSchema = async (data: {id: number}) => {
    const link = await SocialLink.findOne({id: data.id})
    return Joi.object({
        name: Joi.string()
        .min(2)
        .required()
        .messages({
            'string.base': 'ბმულის სახელი უნდა იყოს ტექსტური',
            'string.min': 'ბმულის სახელი უნდა შედგებოდეს მინიმუმ ორი სიმბოლოსგან',
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
        id: Joi.number()
            .custom(determineIfLinkExists(link))
            .required()
            .messages({
                'number.base': 'აიდი უნდა იყოს რიცხვი',
                'number.custom': 'სოციალური ბმული აღნიშნული აიდით ვერ მოიძებნა',
                'number.required': 'აიდის ველი არ უნდა იყოს ცარიელი'
            })   
    })
}

export default updateLinkSchema