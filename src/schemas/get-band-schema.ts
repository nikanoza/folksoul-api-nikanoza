import Joi from 'joi'
import { Band } from 'models'
import { IBand } from 'types'

const determineIfBandExists = (band: IBand | null) => (value: number, helpers: any) => {
    if (!band) {
      return helpers.message('ბენდი ვერ მოიძებნა')
    }
    return value
}

const getBandSchema = async (data: {name: string}) => {
    const band = await Band.findOne({name: data.name})
    return Joi.object({
        name: Joi.string()
            .custom(determineIfBandExists(band))
            .required()
            .messages({
                'string.base': 'ბენდის სახელი უნდა იყოს ტექსტური',
                'string.required': 'სახელის ველი არ უნდა იყოს ცარიელი'
            })   
    })
}

export default getBandSchema