"use client";
import React from "react";
import { Checkbox } from "@/app/components/checkbox";
import { useConfig } from "@/app/hooks/use-config";

const SearchBarToggle = () => {
  const [config, setConfig] = useConfig();
  if (config.menuHidden || config.layout === "horizontal") return null;
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={config.showSearchBar}
        id="searchBarToggle"
        onCheckedChange={() =>
          setConfig({ ...config, showSearchBar: !config.showSearchBar })
        }
      />
      <label
        htmlFor="searchBarToggle"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Search Bar
      </label>
    </div>
  );
};

export default SearchBarToggle;
