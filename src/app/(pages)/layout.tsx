'use client'

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
     
      {children}
    
    </div>
  );
};

export default Layout;
