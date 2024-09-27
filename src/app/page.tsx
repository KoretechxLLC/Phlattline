"use client";
import React, { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import SplashScreen from "./components/SplashScreen";

const Page = () => {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);

  const getSplash = async () => {
    const hasShownSplashScreen = await localStorage.getItem(
      "hasShownSplashScreen"
    );

    if (!hasShownSplashScreen || hasShownSplashScreen == "false") {
      // Show the splash screen for 5 seconds initially
      setTimeout(async () => {
        setIsSplashScreen(false);
        await localStorage.setItem("hasShownSplashScreen", "true"); // Mark splash screen as shown
      }, 3800);
    } else {
      setIsSplashScreen(false);
    }
  };

  useEffect(() => {
    // Check if the splash screen has already been shown in this session
    getSplash();

    const handleBeforeUnload = () => {
      localStorage.removeItem("hasShownSplashScreen");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSplashScreen]);

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
