'use client'

import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useAuth } from '@hooks/useAuth'

const MagicLogin = () => {
  const [email, setEmail] = useState('')
  const { sendMagicLink } = useAuth()

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMagicLink(email)
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Access Your Account with <br />a Magical Link
            </h3>
          </div>
        </div>
        <form onSubmit={loginHandler}>
          <div>
            <label className="font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              value={email}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-brand-blue-600 shadow-sm rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-brand-blue-600 hover:bg-brand-blue-500 active:bg-brand-blue-600 rounded-lg duration-150"
          >
            Generate Magic Link
          </button>
        </form>
        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or
          </p>
        </div>

        <div className="space-y-4 text-sm font-medium">
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            Login with Username and Password
          </Link>
        </div>
      </div>
    </main>
  )
}

export default MagicLogin
