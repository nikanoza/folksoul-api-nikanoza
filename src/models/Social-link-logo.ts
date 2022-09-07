import mongoose from "mongoose";
import { ISocialLinkLogo } from "types";

const { Schema } = mongoose

const linkLogoSchema = new Schema<ISocialLinkLogo>({
    image: {
        type: Schema.Types.String,
        required: true
    },
    socialLinkId: {
        type: Schema.Types.Number,
        required: true
    }
})

const SocialLinkLogo = mongoose.model<ISocialLinkLogo>('SocialLinkLogo', linkLogoSchema)

export default SocialLinkLogo