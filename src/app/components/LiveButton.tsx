"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LiveButton = () => {
  const router = useRouter();
  return (
    <div
      className="w-full h-10 rounded-lg bg-red-600 flex items-center justify-between pr-4 cursor-pointer"
      onClick={() => router.push("")}
    >
      <div className="flex items-center">
        <Image
          width={100}
          height={100}
          src={"/assets/LiveIcon.png"}
          alt={"live image"}
          className="ml-5 h-5 w-6"
        />
        <span className="ml-2 text-base">Training-On demand</span>
      </div>
      <Image
        width={25}
        height={25}
        src={"/assets/ArrowRightUp.png"}
        alt={""}
        className="ml-10"
      />
    </div>
  );
};

export default LiveButton;
