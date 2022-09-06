import mongoose from "mongoose";
import { IBand } from "types";

const { Schema } = mongoose

const bandSchema = new Schema<IBand>({
    logo: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    }
})

const Band = mongoose.model<IBand>('Band', bandSchema)

export default Band 