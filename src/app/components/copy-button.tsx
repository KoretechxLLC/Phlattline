"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";

import { Event, trackEvent } from "@/app/lib/events";
import { cn } from "@/app/lib/utils";
import { Button, ButtonProps } from "@/app/components/button-sidebar";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/tooltip";

export function CopyButton({
  event,
  name,
  code,
  className,
  tooltip = "Copy code",
  ...props
}: {
  event: Event["name"];
  name: string;
  code: string;
  tooltip?: string;
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "[&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5 border-default-500 text-default-500 ",
              className
            )}
            onClick={() => {
              navigator.clipboard.writeText(code);
              trackEvent({
                name: event,
                properties: {
                  name,
                },
              });
              setHasCopied(true);
            }}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-default text-default-foreground text-sm font-normal">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
