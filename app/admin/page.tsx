import Dashboard from '@components/admin/Dashboard'
import { UserTable } from '@components/admin/UserTable'
import { users } from '@lib/appWriteAdminConfig'
import { AppwriteException } from 'node-appwrite' // Import the necessary types
import React from 'react'

export async function getUsers() {
  try {
    const getAllUser = await users.list()
    return { getAllUser }
  } catch (error) {
    const appWriteError = error as AppwriteException
    return { appWriteError }
  }
}

const page = async () => {
  const { getAllUser } = await getUsers()

  return (
    <div>
      <Dashboard />
      {getAllUser ? (
        <UserTable allUsers={getAllUser} />
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  )
}

export default page
