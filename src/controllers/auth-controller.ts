import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from 'models';
import { authSchema } from "schemas"
import { IUser } from "types"

const login = async (req: express.Request, res: express.Response) => {
    const { body } = req
    const validator = await authSchema(body)

    const { value: data, error } = validator.validate(body)

    if(error){
        return res.status(422).json(error.details)
    }

    const { name, password } = data

    const user = await User.findOne({ name }).select('+password')
    const result = await bcrypt.compare(password, user?.password || '')

    if(result){
        const signData: IUser = {
            name: user?.name || '',
            password: user?.password || ''
        }

        const token = jwt.sign(signData, process.env.JWT_SECRET || '')
        return res.json({ token })
    }

    return res
    .status(401)
    .json({ message: 'please, provide correct credentials...' })
}

export default {login}