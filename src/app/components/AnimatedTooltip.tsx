"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const handleError = () => {
    setImgError(true); // Set error flag when image fails to load
  };

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="-mr-5  relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 15,
                  y: 65,
                  scale: 0.85,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-24 -left-12 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-gradient-to-b whitespace-nowrap from-[#62626280] to-[#2D2C2C80] z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[10%] -bottom-px bg-gradient-to-r from-transparent via-gray-600 to-transparent h-px " />
                <div className="absolute left-10 w-[30%] z-50 -bottom-px bg-gradient-to-r from-transparent via-yellow-800 to-transparent h-px " />
                <div className="font-bold text-white relative z-50 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          {item.image ? (
            <Image
              onMouseMove={handleMouseMove}
              height={40}
              width={40}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-2xl h-7 w-7 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
            />
          ) : (
            <div className="object-cover !m-0 !p-0 object-top rounded-2xl h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white bg-gradient-to-b from-[#BAA716] to-[#B50D34]  relative transition duration-500">
              <span className="text-white text-sm md:text-sm font-bold py-3">
                {item.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
