import mongoose from 'mongoose'

const connect = async () => {
  try {
    const connectionURL = `mongodb+srv://${process.env.MONGO_HOST}:${process.env.MONGO_PASSWORD}@folksoul.3b7vk.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    return mongoose.connect(connectionURL)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default connect