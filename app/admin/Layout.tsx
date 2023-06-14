import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex">
      <aside>{/* <SideBar /> */}</aside>
      <main>{children}</main>
    </section>
  )
}

export default Layout
