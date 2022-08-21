import mongoose from 'mongoose'

const { MONGO_PASSWORD, MONGO_PROTOCOL, MONGO_USER, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

const isAtlas = () => MONGO_PROTOCOL !== 'mongodb'
const generateAtlasUrl = () => `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
const generateLocalUrl = () => `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`


const connect = async () => {
  try {
    const connectionURL = isAtlas() ? generateAtlasUrl() : generateLocalUrl()
    return mongoose.connect(connectionURL)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default connect