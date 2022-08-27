import Joi, { ValidationResult } from "joi";
import { User } from "../models/index.js";
import { IUser } from "../types/models";

const determineIfUserExists = (user: IUser | null) => (joiResult: ValidationResult) => {
    if(!user){
        return joiResult.error
    }
    return user.name
}

const authSchema = async(data: IUser) => {
    const findUserWithName = await User.findOne({name: data.name})

    return Joi.object({
        name: Joi.string()
            .min(3)
            .pattern(/^[a-zა-ჰ0-9]{3,}$/)
            .custom(determineIfUserExists(findUserWithName))
            .required()
            .messages({
                'string.base': 'მეტსახელის ჩანაწერის ტიპი უნდა იყოს ტექსტური',
                'string.min': 'მეტსახელი უნდა შედგებოდეს მინიმუმ სამი სიმბოლოსგან',
                'string.pattern': 'მეტსახელი უნდა შეიცავდეს დაბალი რეგისტრის ასოებსა და ციფრებს',
                'string.required': 'მეტსახელის ველი არ უნდა იყოს ცარიელი'
            }),
        password: Joi.string().min(3).required().messages({
            'string.base': 'პაროლის ჩანაწერის ტიპი უნდა იყოს ტექსტური',
            'string.min': 'პაროლი უნდა შედგებოდეს მინიმუმ სამი სიმბოლოსგან',
            'string.required': 'პაროლის ველი არ უნდა იყოს ცარიელი'
        })   
    })
}

export default authSchema 

