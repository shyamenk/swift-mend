'use client'
import React, {useEffect, useState} from 'react'

import {FaUser} from 'react-icons/fa'
import UserProfieUpdateModal from '../ui/modal'
import {DataTable} from './complaints/data-table'
import {columns} from './complaints/columns'
import {payments} from '@/app/lib/data'

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const UserProfileUpdate = () => {
    setIsModalOpen(prevState => !prevState)
  }

  return (
    <section className="w-full sm:p-6 pb-18  ">
      <h2 className="font-medium text-2xl p-8">Personal Information</h2>
      <div className="container mx-auto flex flex-col space-y-28 overflow-hidden grow">
        <fieldset className="grid grid-cols-4 gap-2 rounded-md p-6   bg-brand-blue-50">
          <div className="flex gap-4 col-span-full sm:col-span-2">
            <FaUser className="w-12 h-14 text-brand-blue-400" />
            <div className="col-span-full sm:col-span-1">
              <h1 className="text-2xl font-semibold text-brand-gray-700">
                Shyamkumar
              </h1>
              <h1 className="text-brand-gray-400">shyamenk@gmail.com</h1>
            </div>
          </div>
          <div className="col-span-full sm:col-span-1">
            <h1 className="text-lg font-semibold text-brand-gray-700">
              Phone Number
            </h1>
            <h1 className="text-brand-gray-400">+91-9895883315</h1>
          </div>
          <div className="col-span-full sm:col-span-1 ">
            <button
              onClick={UserProfileUpdate}
              className="block py-2 px-4 text-center text-white font-medium bg-brand-blue-500 duration-150 hover:bg-brand-blue-600 active:bg-brand-blue-700 rounded-lg shadow-lg hover:shadow-none"
            >
              Edit Profile
            </button>
          </div>
          {isModalOpen && (
            <UserProfieUpdateModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
            />
          )}
        </fieldset>
      </div>
      <h2 className="font-medium text-2xl p-8">
        Complaint Summary Information
      </h2>
      <div className="container mx-auto py-6">
        <DataTable columns={columns} data={payments} />
      </div>
    </section>
  )
}

export default UserProfile
