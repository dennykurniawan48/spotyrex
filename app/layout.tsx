import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./store/provider";
import Player from "./components/player";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ModalLogin from "./components/modallogin";
import AuthProvider from "./AuthProvider";
import UserInfo from "./components/userinfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <ReduxProvider>
          <body className={inter.className}>
            <main className="flex min-h-screen flex-col">
              <div className="w-full h-6 bg-slate-500 text-white flex items-center justify-center">
                <span className="text-xs">Portfolio Denny Kurniawan</span>
              </div>
              <div className="w-full h-[calc(100vh_-_7rem)] flex flex-row">
                <div className="sm:hidden md:flex flex-col py-2 md:w-1/4 lg:w-1/5 h-full bg-gray-700 items-center justify-between pt-4">
                  <div className="w-full flex flex-col items-center">
                    <Link href="/"><span className="text-3xl text-white">Spotyrex</span></Link>
                    <div className="w-full flex flex-col space-y-3 p-4">
                      <Link
                        href={"/"}
                        className="w-full p-2 hover:bg-slate-300 hover:text-gray-600"
                      >
                        <span>Home</span>
                      </Link>
                      <Link
                        href={"/artist"}
                        className="w-full p-2 hover:bg-slate-300 hover:text-gray-600"
                      >
                        <span>Artists</span>
                      </Link>
                    </div>
                  </div>
                    <UserInfo/>
                </div>
                <>{children}</>
              </div>

              <Player />
            </main>
            <ModalLogin />
          </body>
        </ReduxProvider>
      </html>
    </AuthProvider>
  );
}
