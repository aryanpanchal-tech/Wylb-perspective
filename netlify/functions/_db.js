import { MongoClient } from 'mongodb'

let client = null
let db = null

export const connectToDatabase = async () => {
  if (client && db) {
    return {
      client,
      db,
    }
  }

  const mongoUri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB_NAME || 'wyldPS'

  if (!mongoUri) {
    throw new Error(' MongoDB connection string cannot be found???.')
  }

  client = new MongoClient(mongoUri)
  await client.connect()

  db = client.db(dbName)

  return {
    client,
    db,
  }
}