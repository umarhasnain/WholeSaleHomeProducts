
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>

     <div className=''>
     {children}
     </div>
  
     
    </div>
  );
};

export default Layout;
