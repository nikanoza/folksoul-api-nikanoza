import mongoose from "mongoose";

const { Schema } = mongoose

export interface ISocialLink {
    image: Buffer,
    name: string,
    link: string,
}

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

const SocialLink = mongoose.model<ISocialLink>('Singer', socialLinkSchema)

export { SocialLink }