import mongoose from "mongoose";
import { ISinger } from "types";

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
    orbitLength: {
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