import mongoose from 'mongoose'

const { MONGO_PASSWORD, MONGO_PROTOCOL, MONGO_USER, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

const connect = async () => {
  try {
    let connectionURL = '';
    if(MONGO_PROTOCOL === 'mongodb'){
      connectionURL = `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
    }else{
      connectionURL = `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
    }
    return mongoose.connect(connectionURL)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default connect