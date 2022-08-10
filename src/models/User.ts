import mongoose, { Schema } from "mongoose";

export interface IUser {
    name: string,
    password: string,
}

const userSchema = new Schema<IUser>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
})

const User = mongoose.model<IUser>('User', userSchema)

export { User }
