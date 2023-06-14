'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@hooks/useAuth'

const Verification = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const secret = searchParams.get('secret') || ''

  const { updateMagicVerification, loading } = useAuth()

  useEffect(() => {
    updateMagicVerification(userId, secret)
  }, [userId, secret, updateMagicVerification])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 py-6">
        {loading ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Verifying Email...</p>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500 mb-4">
              Email Successfully Verified!
            </p>
            <p className="text-gray-500">You can now access your account.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Verification
