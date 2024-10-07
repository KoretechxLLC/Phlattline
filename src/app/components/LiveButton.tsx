"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const LiveButton = () => {
  return (
    <div className="w-80 h-10 rounded-lg bg-red-600">
      <Image
        width={25}
        height={25}
        src={"/assets/LiveIcon.png"}
        alt={""}
        className="flex float-start mt-2 ml-2"
      ></Image>
      <div>
        <span className="ml-5 top-5" style={{ fontFamily: "Sansation" }}>
          Training-On demand
        </span>
      </div>
      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default LiveButton;
