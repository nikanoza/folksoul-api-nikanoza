import mongoose from "mongoose";
import { ISinger } from "../types/models";

const { Schema } = mongoose

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
    },
    id: {
        type: Schema.Types.Number,
        required: true
    }
})

const Singer = mongoose.model<ISinger>('Singer', singerSchema)

export default Singer 