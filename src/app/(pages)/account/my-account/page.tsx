'use client';

import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaCloudDownloadAlt,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import AccountCard from "@/components/AccountCard";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const MyAccountPage = () => {
  const [username, setUsername] = useState("User");
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // You can also fetch more from Firestore if needed
        setUsername(user.displayName || user.email || "User");
      }
    };
    fetchUserData();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row">
        <main className="flex-1 p-6">
          <p className="mb-4">
            Hello <strong>{username}</strong> (
            <button onClick={handleLogout} className="text-blue-600 underline">
              Log out
            </button>
            )
            <br />
            From your account dashboard you can view your{" "}
            <a href="/account/orders" className="text-blue-600 underline">
              recent orders
            </a>
            , manage your{" "}
            <a href="/account/addresses" className="text-blue-600 underline">
              shipping and billing addresses
            </a>
            , and{" "}
            <a href="/account/details" className="text-blue-600 underline">
              edit your password and account details
            </a>
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AccountCard
              title="ORDERS"
              icon={FaBoxOpen}
              onClick={() => router.push("/account/orders")}
            />
            <AccountCard title="DOWNLOADS" icon={FaCloudDownloadAlt} />
            <AccountCard
              title="ADDRESSES"
              icon={FaMapMarkerAlt}
              onClick={() => router.push("/account/addresses")}
            />
            <AccountCard
              title="ACCOUNT DETAILS"
              icon={FaUser}
              onClick={() => router.push("/account/details")}
            />
            <AccountCard
              title="LOGOUT"
              icon={FaSignOutAlt}
              onClick={handleLogout}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccountPage;
