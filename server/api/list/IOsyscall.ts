import { getMongoClient } from '#server/utils/mongodb.ts'

export default defineEventHandler(async (_event) => {
  const client = await getMongoClient()
  const db = client.db('os9docs')
  const document = await db
    .collection('syscalls')
    .find({}, { projection: { _id: 0, function: 1, code: 1 } })
    .toArray()
  return document
})
