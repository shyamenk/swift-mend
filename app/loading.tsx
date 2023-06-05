import React from 'react'

const loading = () => {
  return (
    <div className="relative">
      <div></div>

      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    </div>
  )
}

export default loading
