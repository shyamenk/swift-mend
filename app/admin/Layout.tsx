import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex">
      <main>{children}</main>
    </section>
  )
}

export default Layout
