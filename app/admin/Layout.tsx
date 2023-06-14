import AdminNav from '@components/admin/AdminNav'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminNav />
      {children}
    </>
  )
}

export default DashboardLayout
