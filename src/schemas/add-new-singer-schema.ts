import Joi from "joi";

const addNewSingerSchema = () => {
    return Joi.object({
        name: Joi.string()
        .min(3)
        .pattern(/^[ა-ჰ]{3,}$/)
        .required()
        .messages({
            'string.base': 'სახელის ტიპი უნდა იყოს ტექსტური',
            'string.min': 'სახელი უნდა შედგებოდეს მინიმუმ სამი სიმბოლოსგან',
            'string.pattern': 'სახელი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს',
            'string.required': 'სახელის ველი არ უნდა იყოს ცარიელი'
        }),
        instrument: Joi.string()
        .min(2)
        .pattern(/^[ა-ჰ]{2,}$/)
        .required()
        .messages({
            'string.base': 'ინსტრუმენტის ტიპი უნდა იყოს ტექსტური',
            'string.min': 'ინსტრუმენტი უნდა შედგებოდეს მინიმუმ სამი სიმბოლოსგან',
            'string.pattern': 'ინსტრუმენტი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს',
            'string.required': 'ინსტრუმენტის ველი არ უნდა იყოს ცარიელი'
        }),
        orbit_length: Joi.number()
        .required()
        .messages({
            'string.base': 'ორბიტის სიგრძე უნდა იყოს რიცხვი',
            'string.required': 'ორბიტის სიგრძის ველი არ უნდა იყოს ცარიელი'
        }),
        color: Joi.string()
        .pattern(/^#[0-9A-Z]{6}$/)
        .required()
        .messages({
            'string.base': 'ფერი უნდა იყოს ტექსტური',
            'string.pattern': 'ფერი უნდა იყოს hex ფორმატის',
            'string.required': 'ფერის ველი არ უნდა იყოს ცარიელი'
        }),
        biography: Joi.string()
        .pattern(/^[ა–ჰ0-9\W]*$/)
        .required()
        .messages({
            'string.base': 'ბიოგრაფია უნდა იყოს ტექსტური',
            'string.pattern': 'ბიოგრაფია უნდა შეიჩავდეს მხოლოდ ქართულ ასოებს',
            'string.required': 'ბიოგრაფია არ უნდა იყოს ცარიელი'
        }),
    })
}

export default addNewSingerSchema