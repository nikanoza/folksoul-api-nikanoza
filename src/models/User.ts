import mongoose from "mongoose";
import { IUser } from "types";

const { Schema } = mongoose

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

export default User
