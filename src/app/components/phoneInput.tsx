"use client";
import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles to override

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${
              visible ? radius + "px" : "0px"
            } circle at ${mouseX}px ${mouseY}px,
            var(--orange-500),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-xl transition duration-300 group/input"
    >
      <PhoneInput
        country={"us"}
        value={value}
        onChange={onChange}
        inputClass="flex 4xl:h-12 h-14 w-full bg-gray-50 text-black border-[#b74b279d] rounded-lg px-4 py-2 text-sm placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        containerClass="w-full flex 4xl:h-12 h-14 border-2 border-[#b74b279d] shadow-input rounded-md"
        buttonClass="phone-input-button"
        inputStyle={{
          width: "100%",
          height: "45px", // Tailwind h-14 equivalent
          backgroundColor: "#000", // Tailwind bg-gray-50 equivalent
          color: "#fff", // Tailwind text-black equivalent
          border: "0px", // Custom border color
          padding: "0 50px", // Tailwind px-4 equivalent
          fontSize: "0.875rem", // Tailwind text-sm equivalent
          fontFamily: "sansation", // Default font
        }}
        dropdownStyle={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "0.575rem",
          padding: "10px",
        }}
      />
    </motion.div>
  );
};

export { CustomPhoneInput };
