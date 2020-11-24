import url from 'url'

import { MongoClient } from 'mongodb'

export default async () => {
  const mongoURL = `${process.env.MONGO_URL}/btfl?retryWrites=true&w=majority`

  const mongoClient = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  return await mongoClient.db(url.parse(mongoURL).pathname.substr(1))
}
