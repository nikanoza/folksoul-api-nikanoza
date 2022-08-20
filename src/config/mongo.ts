import mongoose from 'mongoose'

const connect = async () => {
  try {
    const connectionURL = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
    return mongoose.connect(connectionURL)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default connect