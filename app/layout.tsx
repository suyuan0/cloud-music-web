import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export const metadata: Metadata = {
  title: "cloud music",
  description: "cloud music web app",
  icons: "/logo.svg"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${roboto.className} flex p-3`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
