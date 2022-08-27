import prompt from 'prompt'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import connectToMongo from '../config/mongo.js'
import { User } from '../models/index.js'

dotenv.config()
connectToMongo()

const schema = {
  properties: {
    name: {
      pattern: /^[a-zA-Z\s-]{4,}$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
    password: {
      hidden: true,
      required: true,
    },
  },
}

prompt.start()
prompt.get(schema, async (err, result) => {
  if (err) {
    console.log(err.message)
    process.exit()
  }
  const findUserWithName = await User.findOne({ name: result.name.toString() })

  if (findUserWithName) {
    console.log('this user name is already taken.')
    process.exit()
  }

  if (result.password.toString().length < 4) {
    console.log('password should be at lease 4 characters long.')
    process.exit()
  }
  const { name, email, password } = result
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password.toString(), salt)
  await User.create({
    name,
    email,
    password: hashedPassword,
  })
  console.log('user is created')
  process.exit()
})