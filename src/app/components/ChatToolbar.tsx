"use client";
import React from "react";
import { TooltipProvider } from "@/app/components/tooltip";
import { Button } from "@/app/components/button-sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/popover";

import Icon from "@/app/components/utility-icon";

const ChatToolbar = () => {
  return (
    <TooltipProvider>
      <div className="flex justify-center my-2 mx-2 space-x-1 rounded-lg bg-[#62626280] p-2">
        {/* Emoji */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="flex items-center justify-center rounded-full hover:ring-0 hover:ring-transparent bg-default-100 hover:bg-default-100 hover:text-default-900 text-default-900"
            >
              <Icon icon="iconoir:emoji" className="w-5 h-5 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            className="w-fit p-0 shadow-none border-none bottom-0 rtl:left-5 ltr:-left-[110px]"
          />
        </Popover>

        {/* File */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="flex items-center justify-center rounded-full hover:ring-0 hover:ring-transparent bg-default-100 hover:bg-default-100 hover:text-default-900 text-default-900"
            >
              <Icon
                icon="teenyicons:attachment-solid"
                className="w-5 h-5 text-gray-400"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            className="w-fit p-0 shadow-none border-none bottom-0 rtl:left-5 ltr:-left-[110px]"
          />
        </Popover>
      </div>
    </TooltipProvider>
  );
};

export default ChatToolbar;
