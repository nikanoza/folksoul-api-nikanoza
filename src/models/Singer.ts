import mongoose, { Schema } from "mongoose";

export interface ISinger {
    name: string,
    instrument: string,
    orbit_length: number,
    color: string,
    biography: string,
}

const singerSchema = new Schema<ISinger>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    instrument: {
        type: Schema.Types.String,
        required: true
    },
    orbit_length: {
        type: Schema.Types.Number,
        required: true
    },
    color: {
        type: Schema.Types.String,
        required: true
    },
    biography: {
        type: Schema.Types.String,
        required: true
    }
})

const Singer = mongoose.model<ISinger>('Singer', singerSchema)

export { Singer }