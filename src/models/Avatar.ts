import mongoose from "mongoose";
import { IAvatar } from "types";

const { Schema } = mongoose

const singerAvatarSchema = new Schema<IAvatar>({
    image: {
        type: Schema.Types.String,
        required: true
    },
    singerId: {
        type: Schema.Types.Number,
        required: true
    }
})

const Avatar = mongoose.model<IAvatar>('Avatar', singerAvatarSchema)

export default Avatar