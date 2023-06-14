import SideBar from '@components/admin/Sidebar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <section className="flex">
      <aside>
        <SideBar />
      </aside>
      <main>{children}</main>
    </section>
  );
};

export default AdminLayout;
