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
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";

const inter = Inter({ subsets: ["latin"] });
const sideMenuPaths = [
  "/",
  "/Contact",
  "/About",
  "/JordanLee",
  "/AminaPatel",
  "/SophiaRodriguez",
  "/ElijahMartinez",
  "/AlexJohnson",
  "/HiroshiTanaka",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showTime, setShowTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const path = usePathname();

  // Load time from localforage on component mount
  useEffect(() => {
    async function loadTime() {
      const storedTime = await localforage.getItem("performanceTimer");
      if (storedTime) {
        setShowTime(storedTime as typeof showTime);
      }
    }
    loadTime();
  }, []);

  // Start or stop timer based on the current path
  useEffect(() => {
    if (path === "/Portal/PerformanceManagement" && showTime.seconds > 0) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setShowTime((prev) => {
            const newSeconds = prev.seconds + 1;
            const newMinutes =
              newSeconds >= 60 ? prev.minutes + 1 : prev.minutes;
            const newHours = newMinutes >= 60 ? prev.hours + 1 : prev.hours;

            const updatedTime = {
              hours: newHours,
              minutes: newMinutes % 60,
              seconds: newSeconds % 60,
            };

            // Store updated time in localforage
            localforage.setItem("performanceTimer", updatedTime);
            return updatedTime;
          });
        }, 1000);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [path, showTime.seconds]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {path !== "/Portal" && (
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
