'use client'

import { Input } from '@components/ui/input'
import { SortAsc, SortDesc } from 'lucide-react'
import React, { useState } from 'react'

type User = {
  $id: string
  name: string
  email: string
  status: boolean
}

type GetAllUser = {
  users: User[]
}

export function UserTable({ allUsers }: { allUsers: GetAllUser }) {
  const [editIndex, setEditIndex] = useState(-1)
  const [editedName, setEditedName] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setEditedName(allUsers.users[index].name)
  }

  const handleSave = () => {
    setEditIndex(-1)
    setEditedName('')
  }

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const sortedUsers = [...allUsers.users].sort((a, b) => {
      if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1
      if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    allUsers.users = sortedUsers
  }

  return (
    <section className="mx-auto md:px-20 md:py-10 px-6 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all Users.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-brand-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new User
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-brand-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-normal text-gray-700">
                  <span className="flex items-center font-semibold">
                    User
                    <button
                      type="button"
                      className="ml-1 text-gray-500 focus:outline-none focus:text-gray-700"
                      onClick={handleSort}
                    >
                      {sortOrder === 'asc' ? <SortAsc /> : <SortDesc />}
                    </button>
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers?.users.map((user, index) => (
                <tr key={user.name}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {editIndex === index ? (
                        <Input
                          type="text"
                          className="text-sm font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      {user.status ? 'Active' : ''}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {editIndex === index ? (
                      <button
                        type="button"
                        className="text-gray-700"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-gray-700"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
