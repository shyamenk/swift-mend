'use client'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './hooks/useAuth'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
// export const metadata = {
//   title: 'Swift Mend',
//   description: 'Rapid Solutions for Seamless Living',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AdminHeader />
          {children}
          <Toaster />
          <AdminFooter />
        </AuthProvider>
      </body>
    </html>
  )
}
