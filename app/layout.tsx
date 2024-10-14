import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${roboto.className} flex p-3 h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Sidebar />
          <main className="flex-1">
            <Header></Header>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
