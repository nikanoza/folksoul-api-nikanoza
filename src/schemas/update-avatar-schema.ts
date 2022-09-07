import Joi from "joi"
import { Avatar, Singer } from "models"
import { IAvatar, ISinger } from "types"

const determineIfAvatarExists = (Avatar: IAvatar | null) => (value: number, helpers: any) => {
    if (!Avatar) {
      return helpers.message('ავატარი აღნიშნული მუსიკოსისთვის არ არსებობს')
    }
    return value
}

const determineIfSingerExists = (singer: ISinger | null) => (value: number, helpers: any) => {
    if (!singer) {
      return helpers.message('ავატარი აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
}

const updateAvatarSchema = async (data: IAvatar) => {
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
            'number.required': 'აიდის ველი არ უნდა იყოს ცარიელი'
        }),
    })
}

export default updateAvatarSchema