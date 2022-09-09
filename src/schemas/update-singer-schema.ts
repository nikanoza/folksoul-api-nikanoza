import Joi from 'joi'
import { Singer } from 'models'
import { ISinger } from 'types'

const determineIfSingerExists = (singer: ISinger | null) => (value: number, helpers: any) => {
  if (!singer) {
    return helpers.message('მომღერალი აღნიშნული აიდით ვერ მოიძებნა')
  }
  return value
}

const singerUpdateSchema = async (data: ISinger) => {
  const singer = await Singer.findOne({ id: data.id })
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
    orbitLength: Joi.number()
        .required()
        .min(201)
        .max(800)
        .messages({
            'number.base': 'ორბიტის სიგრძე უნდა იყოს რიცხვი',
            'number.min': 'ორბირის სიგრძე უნდა იყოს 200ზე მეტი',
            'number.max': 'ორბიტის სიგრძე უნდა იყოს 800ზე ნაკლები',
            'number.required': 'ორბიტის სიგრძის ველი არ უნდა იყოს ცარიელი'
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
    id: Joi.number()
      .custom(determineIfSingerExists(singer))
      .required()
      .messages({
        'number.base': 'id field should be number.',
        'number.custom': 'singer not found',
        'any.required': 'id field is required.',
      }),
  })
}

export default singerUpdateSchema