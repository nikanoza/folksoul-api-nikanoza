import Joi from "joi"
import { Band } from "models"
import { IBand } from "types"

const determineIfBandExists = (band: IBand | null) => (value: string, helpers: any) => {
    if (!band) {
      return helpers.message('ბენდი არ არსებობს')
    }
    return value
}

const updateBandSchema = async (data: IBand) => {
    const band = await Band.findOne({name: data.name})
    return Joi.object({
        name: Joi.string()
        .required()
        .custom(determineIfBandExists(band))
        .messages({
            'string.base': 'ბენდის ლოგოს მისამართი უნდა იყოს ტექსტური',
            'string.custom': 'ბენდი უკვე არსებობს',
            'string.required': 'ბენდის ლოგოს მისამართი არ უნდა იყოს ცარიელი'
        }),
        logo: Joi.string()
        .required()
        .messages({
            'string.base': 'ბენდის ლოგოს მისამართი უნდა იყოს ტექსტური',
            'string.required': 'ბენდის ლოგოს მისამართი არ უნდა იყოს ცარიელი'
        }),
        description: Joi.string()
        .min(100)
        .required()
        .messages({
            'string.base': 'ბენდის აღწერა უნდა იყოს ტექსტური',
            'string.min': 'ბენდის აღწერა უნდა შედგებოდეს მინიმუმ 100 სიმბოლოსგან',
            'string.required': 'ბენდის აღწერა არ უნდა იყოს ცარიელი'
        }),
    })
}

export default updateBandSchema