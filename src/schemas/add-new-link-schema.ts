import Joi from "joi"

const addLinkSchema = () => {
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
            'string.min': 'ბმულის უნდა უნდა იყოს ვალიდური',
            'string.required': 'ბმულის ველი არ უნდა იყოს ცარიელი'
        }),
    })
}