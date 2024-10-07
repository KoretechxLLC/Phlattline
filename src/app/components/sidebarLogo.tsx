"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/app/hooks/use-media-query";

const Logo = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <div
      onClick={() => router.push("/dashboard/analytics")}
      className="flex gap-2 items-center"
    >
      <Image
        src="/assets/WhiteLogo.png" // Update the src to the correct logo image URL
        alt="DashCode Logo"
        className="text-default-900 h-8 w-8 [&>path:nth-child(3)]:text-background [&>path:nth-child(2)]:text-background"
      />
      <h1 className="text-xl font-semibold text-default-900">DashCode</h1>
    </div>
  );
};

export default Logo;
