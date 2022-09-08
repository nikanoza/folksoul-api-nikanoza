import mongoose from "mongoose";
import { ILogo } from "types";

const { Schema } = mongoose

const linkLogoSchema = new Schema<ILogo>({
    image: {
        type: Schema.Types.String,
        required: true
    },
    socialLinkId: {
        type: Schema.Types.Number,
        required: true
    }
})

const Logo = mongoose.model<ILogo>('Logo', linkLogoSchema)

export default Logo