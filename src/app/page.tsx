"use client";
import React, { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import SplashScreen from "./components/SplashScreen";

const Page = () => {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    // Check if the splash screen has already been shown in this session
    const hasShownSplashScreen = sessionStorage.getItem("hasShownSplashScreen");

    if (!hasShownSplashScreen) {
      // Show the splash screen for 5 seconds initially
      setTimeout(() => {
        setIsSplashScreen(false);
        sessionStorage.setItem("hasShownSplashScreen", "true"); // Mark splash screen as shown
      }, 5000);
    } else {
      // If splash screen was already shown in this session, do not show it again
      setIsSplashScreen(false);
    }
  }, []);

  return (
    <>
      {isSplashScreen && (
        <div className="z-50 w-screen h-screen fixed">
          <SplashScreen />
        </div>
      )}
      <HomeScreen />
    </>
  );
};

export default Page;
