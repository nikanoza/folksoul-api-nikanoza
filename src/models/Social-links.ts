import mongoose from "mongoose";
import { ISocialLink } from "types";

const { Schema } = mongoose

const socialLinkSchema = new Schema<ISocialLink>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    link: {
        type: Schema.Types.String,
        required: true
    },
    id: {
        type: Schema.Types.Number,
        required: true
    }
})

const SocialLink = mongoose.model<ISocialLink>('SocialLink', socialLinkSchema)

export default SocialLink 