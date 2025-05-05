// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { ReactNode } from 'react';

// type Props = {
//   children: ReactNode;
// };

// const AccountLayout = ({ children }: Props) => {
//   const pathname = usePathname();

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-gray-100 p-6 border-r">
//         <h2 className="text-2xl font-semibold mb-6">My Account</h2>
//         <nav className="space-y-4">
//           <Link
//             href="/account/dashboard"
//             className={pathname.includes('/account/dashboard') ? 'font-bold text-blue-600' : ''}
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/account/orders"
//             className={pathname.includes('/account/orders') ? 'font-bold text-blue-600' : ''}
//           >
//             Orders
//           </Link>
//           <Link
//             href="/account/addresses"
//             className={pathname.includes('/account/addresses') ? 'font-bold text-blue-600' : ''}
//           >
//             Addresses
//           </Link>
//           <Link
//             href="/account/details"
//             className={pathname.includes('/account/details') ? 'font-bold text-blue-600' : ''}
//           >
//             Account details
//           </Link>
//         </nav>
//       </aside>
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// };

// export default AccountLayout;
