"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./button-sidebar";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div
        className="w-full py-3 rounded-lg flex items-center justify-between cursor-pointer"
        style={{ backgroundColor }}
        onClick={handleButtonClick}
      >
        <div className="flex items-center">
          <Image
            width={25}
            height={25}
            src={imageSrc}
            alt={""}
            className="mx-5"
          />
          <span className="text-xl mx-2">{text}</span>
        </div>
        <Image
          width={25}
          height={25}
          src={arrowImageSrc}
          alt={""}
          className="mx-5"
        />
      </div>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [matter, setMatter] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleContinue = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-10 rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 p-5 rounded-xl my-6">
              {/* Input Fields */}
              <div className="my-4 ">
                <input
                  type="text"
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                  placeholder="Matter"
                  className="w-full p-2 rounded-md border text-gray-600 border-gray-300 placeholder-gray-400"
                />
              </div>
              <div className="my-4 ">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full p-2 rounded-md border border-gray-300 ${
                    date ? "text-gray-600" : "text-gray-400"
                  }`}
                />
              </div>
              <div className="my-4 ">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full p-2 rounded-md border border-gray-300 ${
                    time ? "text-gray-600" : "text-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                color="primary"
                className="text-white px-5 text-sm md:text-base lg:text-base flex w-full h-12 justify-center items-center rounded-3xl"
                onClick={handleContinue}
              >
                Send Request
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabButton;
