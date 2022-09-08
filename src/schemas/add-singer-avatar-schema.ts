import Joi from "joi"
import { Singer, Avatar, } from "models"
import { ISinger, IAvatar } from "types"

const determineIfAvatarExists = (avatar: IAvatar | null) => (value: number, helpers: any) => {
    if (avatar) {
      return helpers.message('ავატარი აღნიშნული მუსიკოსისთვის უკვე არსებობს')
    }
    return value
}

const determineIfSingerExists = (singer: ISinger | null) => (value: number, helpers: any) => {
    if (!singer) {
      return helpers.message('მუსიკოსი აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
}

const addAvatarSchema = async (data: IAvatar) => {
    const avatar = await Avatar.findOne({singerId: data.singerId})
    const singer = await Singer.findOne({id: data.singerId})
    return Joi.object({
        image: Joi.string()
        .required()
        .messages({
            'string.base': 'ავატარის მისამართი უნდა იყოს ტექსტური',
            'string.required': 'ავატარის მისამართი არ უნდა იყოს ცარიელი'
        }),
        singerId: Joi.number()
        .required()
        .custom(determineIfAvatarExists(avatar))
        .custom(determineIfSingerExists(singer))
        .messages({
            'number.base': 'აიდი უნდა იყოს ციფრი',
            'number.required': 'აიდი არ უნდა იყოს ცარიელი'
        }),
    })
}

export default addAvatarSchema