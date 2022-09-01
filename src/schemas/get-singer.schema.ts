import Joi from 'joi'
import { Singer } from 'models'
import { ISinger } from 'types'

const determineIfSingerExists = (singer: ISinger | null) => (value: number, helpers: any) => {
    if (!singer) {
      return helpers.message('მომღერალი აღნიშნული აიდით ვერ მოიძებნა')
    }
    return value
  }

const getSingerSchema = async (data: {id: number}) => {
    const singer = await Singer.findOne({id: data.id})
    return Joi.object({
        id: Joi.number()
            .custom(determineIfSingerExists(singer))
            .required()
            .messages({
                'number.base': 'აიდი უნდა იყოს რიცხვი',
                'number.custom': 'მუსიკოსი აღნიშნული აიდით ვერ მოიძებნა',
                'number.required': 'აიდის ველი არ უნდა იყოს ცარიელი'
            })   
    })
}

export default getSingerSchema