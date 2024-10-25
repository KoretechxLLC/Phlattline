"use client";
import { useState } from "react";
import Icon from "@/app/components/utility-icon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

const HoursDropdown = () => {
  // State to store selected option
  const [selectedOption, setSelectedOption] = useState("Weekly");

  // Update selected option on item click
  const handleSelect = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center w-full items-center mx-5 space-x-5 bg-[#2D2C2C80] rounded-3xl cursor-pointer p-1">
          <span className="text-sm text-gray-400">{selectedOption}</span>
          <Icon
            icon="teenyicons:down-solid"
            className="w-2 h-2 text-gray-400"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px] p-0">
        <DropdownMenuItem
          onClick={() => handleSelect("Weekly")}
          className="py-2 bg-[#000] text-gray-400 cursor-pointer rounded-none border-b border-default-200 text-default-900 focus:bg-default-400 focus:text-default-100 dark:focus:text-default-900"
        >
          Weekly
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSelect("Monthly")}
          className="py-2 bg-[#000] text-gray-400 cursor-pointer rounded-none border-b border-default-200 text-default-900 focus:bg-default-400 focus:text-default-100 dark:focus:text-default-900"
        >
          Monthly
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSelect("Yearly")}
          className="py-2 bg-[#000] text-gray-400 cursor-pointer rounded-none text-default-900 focus:bg-default-400 focus:text-default-100 dark:focus:text-default-900"
        >
          Yearly
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HoursDropdown;
