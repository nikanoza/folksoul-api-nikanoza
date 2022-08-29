import Joi, { ValidationResult } from 'joi'
import { Singer } from '../models/index.js'
import { ISinger } from '../types/models.js'

const determineIfSingerExists = (singer: ISinger | null) => (joiResult: ValidationResult) => {
    if(!singer){
        return joiResult.error
    }
    return singer.id
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