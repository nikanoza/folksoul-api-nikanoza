import mongoose, { Schema } from "mongoose";

export interface IMusician {
    name: string,
    instrument: string,
    orbit_length: number,
    color: string,
    biography: string,
}

const musicianSchema = new Schema<IMusician>({
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

const Musician = mongoose.model<IMusician>('Musician', musicianSchema)

export { Musician }