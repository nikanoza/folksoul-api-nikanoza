import Joi from "joi"
import { SocialLink, Logo } from "models"
import { ISocialLink, ILogo } from "types"

const determineIfLogoExists = (logo: ILogo | null) => (value: number, helpers: any) => {
    if (!logo) {
      return helpers.message('ლოგო აღნიშნული ბმულისთვის არ არსებობს')
    }
    return value
}

const determineIfLinkExists = (link: ISocialLink | null) => (value: number, helpers: any) => {
    if (!link) {
      return helpers.message('სოციალური ბმული აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
}

const updateLinkLogoSchema = async (data: ILogo) => {
    const logo = await Logo.findOne({socialLinkId: data.socialLinkId})
    const link = await SocialLink.findOne({id: data.socialLinkId})
    return Joi.object({
        image: Joi.string()
        .required()
        .messages({
            'string.base': 'ლოგოს მისამართი უნდა იყოს ტექსტური',
            'string.required': 'ლოგოს მისამართი არ უნდა იყოს ცარიელი'
        }),
        socialLinkId: Joi.number()
        .required()
        .custom(determineIfLogoExists(logo))
        .custom(determineIfLinkExists(link))
        .messages({
            'number.base': 'ბმულის უნდა იყოს ტექსტური',
            'number.required': 'ბმულის ველი არ უნდა იყოს ცარიელი'
        }),
    })
}

export default updateLinkLogoSchema