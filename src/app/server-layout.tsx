// server-layout.tsx
import { usePathname } from "next/navigation"; // Import hook to get current pathname
import { Geist, Geist_Mono } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WholesaleHome – Bulk Deals on Electronics, Kitchen, Tools & More",
  description:
    "Discover unbeatable wholesale prices on Electronics, Home & Kitchen, Automotive, Sports, Tools & more. Shop bulk with confidence at WholesaleHome – your trusted B2B marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current route is part of the admin dashboard (starts with "/dashboard")
  const isAdminRoute = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DataProvider>
          {/* Only show Header/Footer if not in Admin Dashboard */}
          {!isAdminRoute && <Header />}
          
          {children}

          {!isAdminRoute && <Footer />}
        </DataProvider>
      </body>
    </html>
  );
}
