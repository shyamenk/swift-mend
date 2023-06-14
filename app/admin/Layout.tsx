import { SidebarOne } from '@components/admin/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex">
      <aside>
        <SidebarOne />
      </aside>
      <main>{children}</main>
    </section>
  )
}

export default Layout
