"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaCloudDownloadAlt,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

type Props = {
  children: ReactNode;
};

const tabs = [
  { label: "Orders", href: "/account/orders", icon: <FaBoxOpen /> },
  { label: "Downloads", href: "/account/downloads", icon: <FaCloudDownloadAlt /> },
  { label: "Addresses", href: "/account/addresses", icon: <FaMapMarkerAlt /> },
  { label: "Account", href: "/account/details", icon: <FaUser /> },
];

const AccountLayout = ({ children }: Props) => {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <aside className="w-64 bg-white border-r p-4 space-y-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPath === tab.href
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto border-b bg-white">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 px-2 py-3 text-xs font-medium transition-all ${
                currentPath === tab.href
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <div className="text-lg">{tab.icon}</div>
              {tab.label}
            </Link>
          ))}
        </div>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AccountLayout;
