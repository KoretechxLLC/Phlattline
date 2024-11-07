"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Logo = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <>
      <Image
        src={
          path == "/AlexJohnson" || path == "/HiroshiTanaka" || path == "/"
            ? "/assets/WhiteLogo.png"
            : "/assets/RadiantLogo.png"
        }
        alt="Logo"
        className="3xl:w-[80%] 4xl:w-[75%]"
        height="100"
        width="200"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default Logo;
