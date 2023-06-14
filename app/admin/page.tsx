import Dashboard from '@components/admin/Dashboard'
import { UserTable } from '@components/admin/UserTable'
import { getUsers } from '@utils/getUser'

import React from 'react'

export const revalidate = 3600

const page = async () => {
  const { getUser } = await getUsers()

  return (
    <div>
      <Dashboard />
      {getUser ? <UserTable allUsers={getUser} /> : <p>Loading users...</p>}
    </div>
  )
}

export default page
