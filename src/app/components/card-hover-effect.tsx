import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import Image from "next/image";
import { Button } from "@/app/components/button-sidebar";

export const HoverEffect = ({
  items,
  className, // Accept a className prop
}: {
  items: {
    title: string;
    imageLink: string;
    link: string;
    price: number;
  }[];
  className?: string; // Optional className prop
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        className, // Apply the custom className last to ensure it takes precedence
        "grid" // Default classes
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src={item?.imageLink}
                width={1000}
                height={1000}
                className="h-32 w-32"
                alt={"Assessment Banner"}
              />
            </div>
            <CardTitle>{item.title}</CardTitle>
            <div className="flex items-center justify-between w-full my-2">
              <span className="text-default-900 group-hover:text-white font-bold text-2xl">
                ${item.price}
              </span>
              <Button
                className="text-white px-5 text-sm md:text-base lg:text-base flex justify-center items-center rounded-3xl ml-4"
                size="default"
                color="primary"
              >
                Buy Now
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-[#626262] relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide my-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
