import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface MenuWidgetProps {
  isActive: boolean;
  onClick?: () => void;
}

const MenuWidget: React.FC<MenuWidgetProps> = ({ isActive, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/OdaasStrategic");
    onClick && onClick();
  };

  return (
    <div
      className={`rounded-l-3xl w-56 ${
        isActive ? "bg-black" : "bg-transparent"
      }`}
    >
      <div
        className={`rounded-lg 4xl:w-48 4xl:h-16 w-52 h-20 cursor-pointer transition-all duration-300 ${
          isActive ? "bg-black ml-5 text-white" : "bg-white text-black"
        }`}
        onClick={handleClick}
      >
        <div
          className={`4xl:mb-2 4xl:mt-2 4xl:p-1 mb-5 mt-8 p-2 relative text-center rounded-2xl transition-colors duration-300 ${
            isActive ? "text-white" : "text-black"
          }`}
        >
          <div className="flex items-center justify-center">
            <div className="4xl:h-14 h-16 border-l-4 border-orange-700" />
            <Image
              className={`ml-5 mr-4 transition-filter duration-300 ${
                isActive ? "filter invert" : ""
              }`}
              alt="ODaas Strategic Platform Logo"
              src={"/assets/OSPLogo.png"}
              priority
              width={40}
              height={40}
            />

            <div
              className={`text-sm font-bold transition-colors duration-300 ${
                isActive ? "text-white" : "text-black"
              }`}
            >
              ODaas Strategic Platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuWidget;
