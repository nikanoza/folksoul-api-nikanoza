import mongoose, { Schema } from "mongoose";

export interface IBand {
    logo: Buffer,
    description: string,
    extra: string,
}

const bandSchema = new Schema<IBand>({
    logo: {
        type: Schema.Types.Mixed,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    extra: {
        type: Schema.Types.String,
        required: true
    }
})

const Band = mongoose.model<IBand>('Band', bandSchema)

export { Band }