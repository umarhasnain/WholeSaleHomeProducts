// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import { DataProvider } from "@/context/DataContext";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WholeSaleHomeProducts – Bulk Deals on Electronics, Kitchen, Tools & More",
  description:
    "Discover unbeatable wholesale prices on Electronics, Home & Kitchen, Automotive, Sports, Tools & more. Shop bulk with confidence at WholesaleHome – your trusted B2B marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClientLayout>
        <DataProvider>
     


          {children}
       
        </DataProvider>
          </ClientLayout>
      </body>
    </html>
  );
}
