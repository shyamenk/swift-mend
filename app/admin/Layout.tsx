import Side from '@components/admin/Side'
// import SideBar from '@components/admin/Sidebar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <section className="flex">
      <aside>
        <Side />
      </aside>
      <main>{children}</main>
    </section>
  )
}

export default AdminLayout
