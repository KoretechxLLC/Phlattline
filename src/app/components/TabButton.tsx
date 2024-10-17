"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TabButtonProps {
  backgroundColor: string;
  text: string;
  imageSrc: string;
  textColor: string;
  arrowImageSrc: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  backgroundColor,
  text,
  imageSrc,
  textColor,
  arrowImageSrc,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full py-3 rounded-lg flex items-center justify-between cursor-pointer" // Added justify-between
      style={{ backgroundColor }} // Apply background color from props
      onClick={() => router.push("")}
    >
      <div className="flex items-center">
        {" "}
        {/* Wrap text and icon in a flex container */}
        <Image
          width={25}
          height={25}
          src={imageSrc} // Use image source from props
          alt={""}
          className="mx-5"
        />
        <span
          className="text-xl mx-2"
          style={{ fontFamily: "Sansation", color: textColor }} // Set text color from props
        >
          {text}
        </span>
      </div>
      <Image
        width={25}
        height={25}
        src={arrowImageSrc} // Use arrow image source from props
        alt={""}
        className="mx-5" // Use mx-5 for consistent margin
      />
    </div>
  );
};

export default TabButton;
