import mongoose from "mongoose";
import { ISocialLink } from "../types/models";

const { Schema } = mongoose

const socialLinkSchema = new Schema<ISocialLink>({
    image: {
        type: Schema.Types.Mixed,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    link: {
        type: Schema.Types.String,
        required: true
    }
})

const SocialLink = mongoose.model<ISocialLink>('SocialLink', socialLinkSchema)

export default SocialLink 