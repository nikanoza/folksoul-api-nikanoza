import Joi from 'joi'
import { SocialLink } from 'models'
import { ISocialLink } from 'types'

const determineIfLinkExists = (link: ISocialLink | null) => (value: number, helpers: any) => {
    if (!link) {
      return helpers.message('სოციალური ბმული აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
}

const getLinkSchema = async (data: {id: number}) => {
    const link = await SocialLink.findOne({id: data.id})
    return Joi.object({
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

export default getLinkSchema