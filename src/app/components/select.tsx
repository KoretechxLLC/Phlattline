"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string; // Add placeholder prop
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder = "Select an option", ...props }, ref) => {
    // Default value for placeholder
    const radius = 100; // Change this to increase the radius of the hover effect
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
        className="p-[2px] rounded-lg transition duration-300 group/select"
      >
        <select
          className={cn(
            `flex h-14 w-full bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm
            placeholder:text-neutral-400 
            disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        >
          <option className="text-gray-500" value="" disabled>
            {placeholder} {/* Use the placeholder prop here */}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </motion.div>
    );
  }
);
Select.displayName = "Select";

export { Select };
