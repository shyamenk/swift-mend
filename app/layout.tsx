import Footer from './components/Site/Footer';
import SiteHeader from './components/Site/SiteHeader';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';

export const metadata = {
  title: 'Swift Mend',
  description: 'Rapid Solutions for Seamless Living',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SiteHeader />
          {children}
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
