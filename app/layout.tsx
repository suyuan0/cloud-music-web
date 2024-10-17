import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <html lang="en" suppressHydrationWarning className="p-3 h-screen">
      <body
        className={`antialiased 
            ${roboto.className} flex rounded-2xl flex-col h-full shadow-[5px_-5px_9px,-5px_5px_9px] 
            dark:shadow-[#b3b3b3] shadow-black border-2 border-[#434549]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-1 rounded-tl-xl rounded-tr-xl overflow-hidden">
            <Sidebar />
            <main className="flex-1">
              <Header></Header>
              {children}
            </main>
          </div>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
