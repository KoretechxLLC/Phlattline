"use client";
import React from "react";
import { Checkbox } from "@/app/components/checkbox";
import { useConfig } from "@/app/hooks/use-config";

const TeamSwitcherToggle = () => {
  const [config, setConfig] = useConfig();
  if (config.menuHidden || config.layout === "horizontal") return null;
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={config.showSwitcher}
        id="team-switcher"
        onCheckedChange={() =>
          setConfig({ ...config, showSwitcher: !config.showSwitcher })
        }
      />
      <label
        htmlFor="team-switcher"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show Team
      </label>
    </div>
  );
};

export default TeamSwitcherToggle;
