import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
    <Header />
     <div className=''>
     {children}
     </div>
    <Footer/>
     
    </div>
  );
};

export default Layout;
