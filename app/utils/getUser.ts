import { users } from '@lib/appWriteAdminConfig'
import { AppwriteException } from 'node-appwrite'

export async function getUsers() {
  try {
    const getUser = await users.list()
    return { getUser }
  } catch (error) {
    const appWriteError = error as AppwriteException
    return { appWriteError }
  }
}
