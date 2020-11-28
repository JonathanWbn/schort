import url from 'url'

import { MongoClient } from 'mongodb'

let cachedDb = null

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const mongoURL = `${process.env.MONGO_URL}/btfl?retryWrites=true&w=majority`

  const mongoClient = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoClient.db(url.parse(mongoURL).pathname.substr(1))

  cachedDb = db
  return db
}
