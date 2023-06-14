import SideBar from '@components/admin/Sidebar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <aside>
        <SideBar />
      </aside>
      <main className="w-full px-4 ">{children}</main>
    </div>
  )
}

export default AdminLayout
