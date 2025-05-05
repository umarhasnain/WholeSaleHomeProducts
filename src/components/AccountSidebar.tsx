// components/Sidebar.tsx
'use client'
import Link from "next/link";

const AccountSidebar = () => {
  return (
    <aside className="w-full md:w-1/4 p-4 border-r">
      {/* <h2 className="font-bold text-xl mb-4">MY ACCOUNT</h2> */}
      <div className="bg-blue-900 text-white px-6 w-full py-4 text-2xl font-semibold">
        My account
      </div>
      <div className="px-6 text-sm text-gray-400 py-2">
        HOME / SHOP / <span className="text-white bg-blue-900 px-2 py-1 rounded">MY ACCOUNT</span>
      </div>
      <nav className="flex flex-col space-y-2">
        <Link href="/account/my-account" className="font-semibold text-black">Dashboard</Link>
        <Link href="/account/orders">Orders</Link>
        <Link href="/account/addresses">Addresses</Link>
        <Link href="/account/details">Account details</Link>
       
      </nav>
    </aside>
  );
};

export default AccountSidebar;
