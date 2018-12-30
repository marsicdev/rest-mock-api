import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db/admin.json')

export const db = low(adapter)
