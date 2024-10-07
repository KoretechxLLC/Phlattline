"use client";
import React from "react";
import { MdSearch } from "react-icons/md";
const HeaderSearch = () => {
  return (
    <div>
      <div className="flex  items-center border-gray-600 border-[1px] rounded-lg xl:text-sm text-lg xl:text-default-400 text-default-800 dark:text-default-700 p-2 w-60 h-9">
        <MdSearch size={24} className="mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-black outline-none"
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
