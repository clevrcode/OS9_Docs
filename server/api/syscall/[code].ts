import { getMongoClient } from '#server/utils/mongodb.ts'

export default defineEventHandler(async (event) => {
  const codeParam = event.context.params?.code
  if (codeParam === undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Missing syscall code' })
  }
  const code = Number.parseInt(codeParam, 10)
  const client = await getMongoClient()
  const db = client.db('os9docs')
  const document = await db
    .collection('syscalls')
    .findOne({ code: code }, { projection: { _id: 0 } })
  return document
})
