import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/app/lib/utils";
import { startOfWeek } from "date-fns";

const today = new Date();
const startOfWeekDate = startOfWeek(today);

// Array of event dates for highlighting purposes
const highlightedEvents = [
  new Date(2024, 9, 20),
  new Date(2024, 9, 25),
  new Date(2024, 9, 26),
  // Add more event dates here
];

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      modifiers={{
        // Define the dates directly as arrays for each modifier
        highlightedFuture: highlightedEvents.filter((date) => date >= today),
        highlightedPast: highlightedEvents.filter((date) => date < today),
      }}
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-0 border-default-200 rounded-3xl dark:border-default-300 md:p-3",
        className
      )}
      classNames={{
        months:
          "w-full border-default-200 px-4 space-y-2 space-x-2 sm:gap-x-2 sm:space-y-0",
        month: "w-full -mx-2 p-1 mt-2 h-[100px] overflow-hidden",
        caption: "flex justify-center py-1 relative items-center",
        caption_label: "text-base border-b border-gray-400 font-medium",
        table: "w-full border-collapse",
        head_row: "flex",
        nav: "hidden",
        head_cell:
          "flex-1 text-muted-foreground rounded-md w-5 font-normal text-[0.8rem]",
        row: "flex w-full gap-1 mt-2",
        cell: "flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: "w-56 h-9 rounded px-4 rounded-lg font-normal text-current hover:text-default",
        day_selected:
          "bg-black text-black border-gray-500 hover:bg-default hover:text-default-foreground focus:bg-default focus:text-default-foreground",
        day_today: "bg-white text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      modifiersClassNames={{
        highlightedFuture: "event-future", // Use the event-future class from globals.css
        highlightedPast: "event-past", // Use the event-past class from globals.css
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
