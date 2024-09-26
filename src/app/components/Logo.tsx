"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const Logo = () => {
  const path = usePathname();
  return (
    <>
      <Link href="/">
        <img
          src={
            path == "/Richard" || path == "/"
              ? "/assets/WhiteLogo.png"
              : "/assets/RadiantLogo.png"
          }
          alt=""
          className="w-[100%] 3xl:w-[80%] 4xl:w-[70%]"
        />
      </Link>
    </>
  );
};

export default Logo;
