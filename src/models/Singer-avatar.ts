import mongoose from "mongoose";
import { ISingerAvatar } from "types";

const { Schema } = mongoose

const singerAvatarSchema = new Schema<ISingerAvatar>({
    image: {
        type: Schema.Types.String,
        required: true
    },
    singerId: {
        type: Schema.Types.Number,
        required: true
    }
})

const SingerAvatar = mongoose.model<ISingerAvatar>('SingerAvatar', singerAvatarSchema)

export default SingerAvatar