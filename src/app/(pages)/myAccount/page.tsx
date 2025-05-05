// pages/account/index.tsx (for older Next.js)
// or app/account/page.tsx (for app directory)

'use client';

import { useEffect, useState } from "react";
import { FaBoxOpen, FaCloudDownloadAlt, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import AccountSidebar from "@/components/AccountSidebar";
import AccountCard from "@/components/AccountCard";
import { useRouter } from "next/navigation"; // or next/navigation in app dir

const MyAccountPage = () => {
  const [username, setUsername] = useState("User");
  const router = useRouter();

  useEffect(() => {
    // Example Firebase user fetch
    // Replace with your Firebase auth + Firestore logic
    const fetchUserData = async () => {
      // Dummy user for demo
      setUsername("brhamaznllc");
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-900 text-white px-6 py-4 text-2xl font-semibold">
        My account
      </div>
      <div className="px-6 text-sm text-gray-400 py-2">
        HOME / SHOP / <span className="text-white bg-blue-900 px-2 py-1 rounded">MY ACCOUNT</span>
      </div>
      <div className="flex flex-col md:flex-row">
        <AccountSidebar />
        <main className="flex-1 p-6">
          <p className="mb-4">
            Hello <strong>{username}</strong> (<button onClick={() => {/* logout logic */}} className="text-blue-600 underline">Log out</button>)<br />
            From your account dashboard you can view your <a href="/account/orders" className="text-blue-600 underline">recent orders</a>,
            manage your <a href="/account/addresses" className="text-blue-600 underline">shipping and billing addresses</a>, and 
            <a href="/account/details" className="text-blue-600 underline"> edit your password and account details</a>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AccountCard title="ORDERS" icon={FaBoxOpen} onClick={() => router.push("/account/orders")} />
            <AccountCard title="DOWNLOADS" icon={FaCloudDownloadAlt} />
            <AccountCard title="ADDRESSES" icon={FaMapMarkerAlt} onClick={() => router.push("/account/addresses")} />
            <AccountCard title="ACCOUNT DETAILS" icon={FaUser} onClick={() => router.push("/account/details")} />
            <AccountCard title="LOGOUT" icon={FaSignOutAlt} onClick={() => {/* logout logic */}} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccountPage;
