import { MongoClient } from 'mongodb'

const uri = useRuntimeConfig().public.MONGODB_URI as string
let client: MongoClient

export async function getMongoClient() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client
}
