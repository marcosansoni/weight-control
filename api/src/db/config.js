const mongoose = require('mongoose')
const pino = require('express-pino-logger')()

const MONGO_DB_URI =
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority`

mongoose
  .connect(MONGO_DB_URI, { useNewUrlParser: true })
  .then(() => pino.logger.info('Successfully connected with Database'))
  .catch((e) => pino.logger.error('Connection error', e.message))

const db = mongoose.connection

module.exports = db
