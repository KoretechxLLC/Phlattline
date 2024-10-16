"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import SideMenu from "./components/SideMenu";
import Logo from "./components/Logo";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const sideMenuPaths = [
  "/",
  "/Contact",
  "/About",
  "/WilliamJames",
  "/JordanLee",
  "/SophiaRodriguez",
  "/ElijahMartinez",
  "/Nancy",
  "/Richard",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {path !== "/Dashboard" && (
              <div className="z-20 fixed left-12 top-12">
                <Logo />
              </div>
            )}
            {sideMenuPaths.includes(path) && (
              <div className="z-20 absolute">
                <SideMenu />
              </div>
            )}
            <SessionProvider>{children}</SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
