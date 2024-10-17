"use client";
import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import SplashScreen from "./components/SplashScreen";

const Page = () => {
  const [isSplashScreen, setIsSplashScreen] = useState<boolean>(true);
  const handleModelLoaded = () => {
    setIsSplashScreen(false);
  };

  return (
    <>
      {/* HomeScreen is always mounted */}
      <div className={`${isSplashScreen ? "hidden" : "block"}`}>
        <HomeScreen onModelLoaded={handleModelLoaded} />
      </div>

      {/* Splash screen is visible until the model loads */}
      {isSplashScreen && (
        <div className="z-50 w-screen h-screen fixed">
          <SplashScreen />
        </div>
      )}
    </>
  );
};

export default Page;
