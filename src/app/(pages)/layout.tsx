'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;
