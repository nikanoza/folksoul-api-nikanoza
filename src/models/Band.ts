import mongoose from "mongoose";

const { Schema } = mongoose

export interface IBand {
    logo: File,
    description: string,
    extra: string,
}

const bandSchema = new Schema<IBand>({
    logo: {
        type: Schema.Types.Buffer,
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