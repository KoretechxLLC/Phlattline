import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import Image from "next/image";
import { Button } from "@/app/components/button-sidebar";
import PaymentPopup from "@/app/components/PaymentPopup"; // Import the PaymentPopup component
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import GraphLoader from "./graphLoader";
import AssessmentPaymentPopup from "./assessmentPaymentPopup";

export const HoverEffect = ({
  items,
  className, // Accept a className prop
}: {
  items: {
    title: string;
    image: string;
    price: number;
  }[];
  className?: string; // Optional className prop
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let [isOpen, setIsOpen] = useState(false); // State to manage the popup visibility
  let [isBought, setIsBought] = useState(false);
  const { loading }: any = useSelector((state: RootState) => state.assessment);
  const existingCards = [
    {
      id: "1",
      number: "4056 8234 1957 1234",
      name: "John Doe",
      expiry: "12/24",
      cvc: "123",
    },
    {
      id: "2",
      number: "3906 8234 1957 5678",
      name: "Jane Smith",
      expiry: "10/25",
      cvc: "456",
    },
  ];

  const handleBuyNowClick = () => {
    setIsOpen(true);
    setIsBought(false);
  };

  return (
    <div className={cn(className, "grid")}>
      {loading ? (
        <div className="text-center text-gray-300 pt-20 items-center justify-center">
          <GraphLoader />
        </div>
      ) : (
        items.map((item, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#62626250] to-[#2D2C2C50] block rounded-3xl"
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
                  src={`/assessmentsImage/${item?.image}`}
                  width={1000}
                  height={1000}
                  className="4xl:h-20 4xl:w-32 h-24 w-36"
                  alt={"Assessment Banner"}
                />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <div className="flex items-center justify-between w-full my-2">
                <span className="text-default-900 group-hover:text-white font-bold 4xl:text-xl text-2xl">
                  ${item.price}
                </span>
                <Button
                  className="text-white px-5 4xl:text-sm   text-sm md:text-base lg:text-base flex justify-center items-center rounded-3xl ml-4"
                  size="default"
                  color="primary"
                  onClick={handleBuyNowClick} // Open the payment popup on button click
                >
                  Buy Now
                </Button>
              </div>
            </Card>
          </div>
        ))
      )}
      <PaymentPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen} // Pass the setIsOpen function to allow closing the popup
        setIsBought={setIsBought} // Pass the setIsBought function to track purchase status
        cards={existingCards} // Pass existing cards as props
      />
    </div>
  );
};

// Card, CardTitle, and CardDescription remain the same
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
        "rounded-2xl h-full w-full 4xl:p-0 p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-[#626262] relative z-20",
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
    <h4
      className={cn(
        "text-zinc-100 font-semibold 4xl:tracking-tight tracking-wide 4xl:my-1 my-4",
        className
      )}
    >
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
