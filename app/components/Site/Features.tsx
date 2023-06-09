import React from 'react'
import { SatelliteDishIcon } from 'lucide-react'
import { FaDatabase, FaRegSnowflake } from 'react-icons/fa'
import { AiFillSecurityScan } from 'react-icons/ai'

export default function Feature() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className=" max-w-xl text-left">
        <h4 className="my-6 text-5xl font-semibold  text-brand-gray-600">
          Our <span className="text-5xl text-brand-blue-500">Swiftmend</span>{' '}
          offers the following benefits
        </h4>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue-100">
            <SatelliteDishIcon className="h-9 w-9 text-brand-blue-500" />
          </div>
          <h3 className="mt-8 text-xl font-semibold text-brand-gray-700">
            Streamlined Complaint Management
          </h3>
          <p className="mt-4 text-base text-gray-600 line-clamp-3">
            Swiftmend provides a user-friendly interface for raising complaints
            related to service disruptions or issues in apartments. It
            simplifies the process, allowing tenants to submit complaints
            effortlessly.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue-100">
            <FaRegSnowflake className="h-9 w-9 text-brand-blue-500" />
          </div>
          <h3 className="mt-8 text-xl font-semibold text-brand-gray-700">
            Efficient Resolution Process
          </h3>
          <p className="mt-4 text-base text-gray-600 line-clamp-3">
            It ensures prompt resolution by streamlining the complaint
            management workflow. Property owners and relevant departments can
            easily track and update the status of complaints, ensuring efficient
            resolution.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue-100">
            <AiFillSecurityScan className="h-9 w-9 text-brand-blue-500" />
          </div>
          <h3 className="mt-8 text-xl font-semibold text-brand-gray-700">
            User Authentication and Security
          </h3>
          <p className="mt-4 text-base text-gray-600 line-clamp-3">
            Appwrite, the cloud-based backend platform used in SimpliComplaint,
            offers secure user authentication. It ensures that only authorized
            individuals can access the system, safeguarding user information and
            complaint data.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue-100">
            <FaDatabase className="h-9 w-9 text-brand-blue-500" />
          </div>
          <h3 className="mt-8 text-xl font-semibold text-brand-gray-700">
            Reliable Database Operations
          </h3>
          <p className="mt-4 text-base text-gray-600 line-clamp-3">
            Appwrite provides robust database operations, ensuring the
            reliability and stability of SimpliComplaint. Complaint data is
            stored securely, allowing easy retrieval and management of
            information for analysis and reporting.
          </p>
        </div>
      </div>
    </div>
  )
}
