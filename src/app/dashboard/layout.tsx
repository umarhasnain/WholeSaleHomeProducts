import React from 'react';
import DashboardLayoutBranding from '@/components/admin/Sidebar';

const Layout = ( ) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardLayoutBranding />

      {/* Page Content */}
      <main className="flex-1 p-4">
        {/* {children} */}
      </main>
    </div>
  );
};

export default Layout;
