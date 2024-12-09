"use client";

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker"; // Import React Date Picker
import "react-datepicker/dist/react-datepicker.css"; // Import Date Picker styles
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { cn } from "../lib/utils"; // Import class name utility

// Infer DatePickerProps from the DatePicker component
type DatePickerProps = React.ComponentProps<typeof DatePicker>;

// Use a type alias to extend DatePickerProps
type CustomDatePickerProps = DatePickerProps & {
  className?: string;
};

const CustomDatePicker = forwardRef<DatePicker, CustomDatePickerProps>(
  ({ className, ...props }, ref) => {
    const radius = 100; // Adjust this to control the hover effect radius
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
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <DatePicker
          {...props}
          className={cn(
            `flex h-14 w-full bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm
            placeholder:text-neutral-400
            disabled:cursor-not-allowed disabled:opacity-50
            `,
            className
          )}
          ref={ref as React.LegacyRef<DatePicker>} // Explicitly cast ref to match DatePicker's type
        />
      </motion.div>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";

export { CustomDatePicker };
