"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const LiveButton = () => {
  const router = useRouter();
  return (
    <div
      className="w-72 h-10 rounded-lg bg-red-600 flex items-center"
      onClick={() => router.push("")}
    >
      <Image
        width={25}
        height={25}
        src={"/assets/LiveIcon.png"}
        alt={""}
        className="ml-5"
      />
      <span className="ml-2" style={{ fontFamily: "Sansation" }}>
        Training-On demand
      </span>
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
