'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.includes('/admin/login');
  const isAdminPage = pathname?.includes('/admin');

  return (
    <>
      {!isLoginPage && <Header />}
      <main className={isLoginPage ? 'min-h-screen' : 'container mx-auto px-4 py-8'}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}

