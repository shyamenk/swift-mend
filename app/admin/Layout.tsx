import Footer from '@components/Site/Footer'
import AdminNav from '@components/admin/AdminNav'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminNav />
      {children}
      <Footer />
    </>
  )
}

export default DashboardLayout
